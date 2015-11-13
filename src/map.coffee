map = ''
marker = ''
infowin = ''
location_tags = {}

projection = 
	size: 4096
	mid: 2048
	max_lat: 90
	max_long: 180
	fromLatLngToPoint: (latLng) ->
		l = latLng.lat()
		x = switch
			when l isnt 0 then projection.mid + (l / projection.max_lat * projection.mid)
			else projection.mid
		l = latLng.lng()
		y = switch
			when l isnt 0 then projection.mid + (l / projection.max_long * projection.mid)
			else projection.mid
		new google.maps.Point x, y
	fromPointToLatLng: (point, noWrap) ->
		point.x = projection.size if point.x > projection.size
		point.y = projection.size if point.y > projection.size
		point.x = 0 if point.x < 0
		point.y = 0 if point.y < 0
		lat = switch
			when point.x < projection.mid then 0 - (projection.max_lat - (point.x / projection.mid * projection.max_lat))
			when point.x > projection.mid then ((point.x - projection.mid) / projection.mid * projection.max_lat)
			else 0
		long = switch
			when point.y < projection.mid then 0 - (projection.max_long - (point.y / projection.mid * projection.max_long))
			when point.y > projection.mid then ((point.y - projection.mid) / projection.mid * projection.max_long)
			else 0
		new google.maps.LatLng lat, long

init = ->
	map = new google.maps.Map document.getElementById('map'),
		center:
			lat: -50.1416015625
			lng: -113.203125
		zoom: 0
		zoomControl: false
		streetViewControl: false
		mapTypeControlOptions:
			mapTypeIds: ['sklotopolis']

	Sklotopolis = new google.maps.ImageMapType
		getTileUrl: (coord, zoom) ->
			if coord.x is 0 and coord.y is 0
				return 'http://5.45.109.131/unlimited/mapdump.png'
		tileSize: new google.maps.Size(4096, 4096)
		maxZoom: 0
		minZoom: 0
		name: 'Sklotopolis'
	Sklotopolis.projection = projection

	coordsDiv = document.getElementById('coords')
	map.controls[google.maps.ControlPosition.TOP_CENTER].push coordsDiv
	map.addListener 'mousemove', (e) ->
		coords = projection.fromLatLngToPoint(e.latLng)
		document.getElementById('coordsc').textContent = 'X' + coords.x + ', Y' + coords.y

	map.addListener 'click', (e) ->
		if console?
			console.log 'Lat: ' + e.latLng.lat() + ', Long: ' + e.latLng.lng()

		if marker isnt ''
			marker.setMap(null)
			marker = ''
		if infowin isnt ''
			do infowin.close
			infowin = ''

		coords = projection.fromLatLngToPoint(e.latLng)
		infowin = new google.maps.InfoWindow
			content: 'X' + coords.x + ', Y' + coords.y
			position: e.latLng
		infowin.open map
		infowin.open map

	map.mapTypes.set 'sklotopolis', Sklotopolis
	map.setMapTypeId 'sklotopolis'

	locations.sort (a, b) -> switch
		when a.top and not b.top then -1
		when b.top and not a.top then 1
		when a.name < b.name then -1
		when a.name > b.name then 1
		else 0

	for i, j in locations
		location_tags[i.tag] = j
		if window.location.hash.substr(1) is i.tag
			show_on_map i.tag

	do update_locations

show_on_map = (tag) ->
	location = locations[location_tags[tag]]
	latLng = projection.fromPointToLatLng(x: location.x, y: location.y)

	if marker isnt ''
		marker.setMap(null)
		marker = ''
	if infowin isnt ''
		do infowin.close
		infowin = ''
		
	marker = new google.maps.Marker
		map: map
		draggable: no
		animation: google.maps.Animation.DROP
		position: latLng
		title: location.name

	marker.addListener 'click', (e) ->
		if infowin isnt ''
			do infowin.close
			infowin = ''

		props = []
		if location.mayor?
			props.push '<p>Mayor: ' + location.mayor + '</p>'

		infowin = new google.maps.InfoWindow
			content: '<div id="content">
				<h2>' + location.name + '</h2>
				<div id="bodyContent">
					<p>Coordinates: X' + location.x + ', Y' + location.y + '</p>
					' + props.join('') + '
					<p style="padding-top:10px"><a href="#' + location.tag + '" style="display:inline-block;color:white;padding:3px 6px;border-radius:3px;font-size:13px;background:#2196F3;cursor:pointer;" onclick="share_location(\'' + location.tag + '\', this)">Share this location</a></p>
				</div>
			</div>'
		infowin.open map, marker
		infowin.open map, marker

	map.panTo latLng

	return false

share_location = (tag, el) ->
	el.style.backgroundColor = 'white'
	el.style.padding = 0
	el.innerHTML = '<input type="text" value="http://woubuc.github.io/wu-map/#' + tag + '" style="width:280px;padding:2px;border-radius:3px;border:1px solid #dedede;font-size:12px" onclick="this.select()" />'
	el.childNodes[0].select()
	return false

show_add_form = ->
	document.getElementById('addform').style.display = 'block'
	if document.getElementById('addform').childNodes[0].src is 'about:blank'
		document.getElementById('addform').childNodes[0].src = 'https://docs.google.com/forms/d/1-GW1P_ImiqjYxCFSQGw_kFRbmDRbbpkCFpRbO82jb8Q/viewform?embedded=true&hl=en'

update_locations = ->
	filter = document.getElementById('search').value
	if filter is ''
		Transparency.render document.getElementById('locations'), locations,
			view:
				href: -> '#' + @tag
				onclick: -> 'show_on_map(\'' + @tag + '\')'
	else
		toShow = []
		filter = filter.toLowerCase()
		for i in locations
			if i.name.toLowerCase().indexOf(filter) isnt -1
				toShow.push i

		Transparency.render document.getElementById('locations'), toShow,
			view:
				href: -> '#' + @tag
				onclick: -> 'show_on_map(\'' + @tag + '\')'