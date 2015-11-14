map = ''
marker = ''
infowin = ''
location_tags = {}

projection = 
	size: 4096
	mid: 2048
	coord_multiplier: 2
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
	toCoords: (point) ->
		x: point.x * 2
		y: point.y * 2
	fromCoords: (point) ->
		x: point.x / 2
		y: point.y / 2

init = ->

	# Create map object
	map = new google.maps.Map document.getElementById('map'),
		center:
			lat: -70.037841796875
			lng: -146.6015625
		zoom: 1
		zoomControl: true
		streetViewControl: false
		mapTypeControlOptions:
			mapTypeIds: ['sklotopolis', 'tiled']

	# Image map type
	# Single image, using mapdump as source
	Sklotopolis = new google.maps.ImageMapType
		getTileUrl: (coord, zoom) ->
			if coord.x is 0 and coord.y is 0
				return 'http://5.45.109.131/unlimited/mapdump.png'
		tileSize: new google.maps.Size(4096, 4096)
		maxZoom: 1
		minZoom: 1
		name: 'Official map dump' 
	Sklotopolis.projection = projection
	map.mapTypes.set 'sklotopolis', Sklotopolis

	# Show coordinates
	coordsDiv = document.getElementById('coords')
	map.controls[google.maps.ControlPosition.TOP_CENTER].push coordsDiv
	map.addListener 'mousemove', (e) ->
		coords = projection.toCoords projection.fromLatLngToPoint(e.latLng)
		document.getElementById('coordsc').textContent = 'X' + Math.floor(coords.x) + ', Y' + Math.floor(coords.y)

	# Show location on click
	map.addListener 'click', (e) ->
		if console?
			console.log 'Lat: ' + e.latLng.lat() + ', Long: ' + e.latLng.lng()

		if marker isnt ''
			marker.setMap(null)
			marker = ''
		if infowin isnt ''
			do infowin.close
			infowin = ''

		coords = projection.toCoords projection.fromLatLngToPoint(e.latLng)
		infowin = new google.maps.InfoWindow
			content: 'X' + Math.floor(coords.x) + ', Y' + Math.floor(coords.y)
			position: e.latLng
		infowin.open map
		infowin.open map


	# Tiled map from my own server
	Tiled = new google.maps.ImageMapType
		getTileUrl: (coord, zoom) ->
			zoom = switch zoom
				when 0 then 2048
				when 1 then 4096
				when 2 then 8192
			return 'http://188.226.191.32:8000/' + zoom + '_t_' + coord.x + '_' + coord.y + '.png'
		tileSize: new google.maps.Size(512, 512)
		maxZoom: 2
		minZoom: 0
		name: 'Tiled map (updates approx. hourly)'
	Tiled.projection = projection
	map.mapTypes.set 'tiled', Tiled
	map.setMapTypeId 'tiled'

	# Sort the locations alphabetically
	locations.sort (a, b) -> 
		a_name = a.name.toLowerCase()
		b_name = b.name.toLowerCase()
		a_name = a_name.substr(4) if a_name.substr(0, 3) is 'the'
		b_name = b_name.substr(4) if b_name.substr(0, 3) is 'the'
		switch
			when a.top and not b.top then -1
			when b.top and not a.top then 1
			when a_name < b_name then -1
			when a_name > b_name then 1
			else 0

	# Build tag index for lookup
	for i, j in locations
		location_tags[i.tag] = j
		if window.location.hash.substr(1) is i.tag
			show_on_map i.tag

	do update_locations

show_on_map = (tag) ->
	location = locations[location_tags[tag]]
	latLng = projection.fromPointToLatLng(projection.fromCoords(x: location.x, y: location.y))

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
		if location.note?
			props.push '<p style="font-style:italic">' + location.note + '</p>'

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