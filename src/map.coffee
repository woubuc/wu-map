map = ''
marker = ''
infowin = ''
deed_tags = {}

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
		document.getElementById('coordsc').textContent = 'Mouse cursor at X' + Math.floor(coords.x) + ', Y' + Math.floor(coords.y)

	# Show location on click
	map.addListener 'click', (e) ->
		if console?
			console.log 'Lat: ' + e.latLng.lat() + ', Long: ' + e.latLng.lng()

		show_coords_info projection.toCoords(projection.fromLatLngToPoint(e.latLng))


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

	# Sort the deeds alphabetically
	deeds.sort (a, b) -> 
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
	for i, j in deeds
		deed_tags[i.tag] = j

		img =
			url: 'images/deed_' + (if i.top then 'unique' else i.type or 'solo') + '.png',
			size: new google.maps.Size(32, 37)
			origin: new google.maps.Point(0, 0)
			anchor: new google.maps.Point(16, 37)
		i.marker = new google.maps.Marker
			position: projection.fromPointToLatLng(projection.fromCoords(x: i.x, y: i.y))
			map: map
			icon: img

		i.marker.addListener 'click', show_deed_info.bind(null, i.tag)

		if window.location.hash.substr(1) is i.tag
			show_deed_on_map i.tag

	# Show / hide markers
	map.addListener 'zoom_changed', update_markers

	hash = window.location.hash.substr(1)
	if hash.indexOf(',') isnt -1
		hash = hash.split(',')
		if hash.length is 2
			coords =
				x: parseInt(hash[0])
				y: parseInt(hash[1])
			map.panTo projection.fromPointToLatLng(projection.fromCoords(coords))
			show_coords_info coords

	do update_deeds



update_markers = ->
	zoom = map.getZoom()
	switch
		when zoom is 0
			# Hide deed markers except for NT
			(i.marker.setMap(null) if not i.top) for i in deeds

		else
			i.marker.setMap(map) for i in deeds


# Deed functions
show_deed_on_map = (tag) ->
	deed = deeds[deed_tags[tag]]
	map.panTo projection.fromPointToLatLng(projection.fromCoords(x: deed.x, y: deed.y))
	show_deed_info(tag)

	return false

show_deed_info = (tag) ->
	deed = deeds[deed_tags[tag]]

	if infowin isnt ''
		do infowin.close
		infowin = ''

	props = []
	if deed.type?
		html = '<p style="font-style:italic;' + (if not deed.features? then 'margin-bottom:6px;' else '') + '">'
		html += switch deed.type
			when 'solo' then 'Solo player'
			when 'small' then 'Small settlement'
			when 'large' then 'Large town'
		if deed.features?
			html += ' (recruiting)' if 'recruiting' in deed.features
		html += '</p>'
		props.push html
	else if deed.features?
		props.push '<p style="font-style:italic">Recruiting</p>'

	if deed.features?
		html = '<p style="margin-bottom: 6px">'

		if 'market' in deed.features
			html += '<img src="images/feature_market.png" title="Marketplace on deed" /> '

		if 'trader' in deed.features
			html += '<img src="images/feature_trader.png" title="Trader on deed" /> '

		if 'harbour' in deed.features
			html += '<img src="images/feature_harbour.png" title="Harbour area on deed" /> '

		html += '</p>'
		props.push html

	if deed.mayor?
		props.push '<p style="margin-bottom:6px">Mayor: ' + deed.mayor + (if deed.supporter then ' <img src="images/star.png">' else '') + '</p>'

	props.push '<p>Coordinates: X' + deed.x + ', Y' + deed.y + '</p>'

	if deed.note?
		props.push '<p style="font-style:italic">' + deed.note + '</p>'

	infowin = new google.maps.InfoWindow
		content: '<div id="content">
			<h2>' + deed.name + '</h2>
			<div id="bodyContent">
				' + props.join('') + '
				<p style="padding-top:10px"><a href="#' + deed.tag + '" style="display:inline-block;color:white;padding:3px 6px;border-radius:3px;font-size:13px;background:#2196F3;cursor:pointer;" onclick="share_deed(\'' + deed.tag + '\', this)">Share this deed</a></p>
			</div>
		</div>'
	infowin.open map, deed.marker
	infowin.open map, deed.marker

	window.location.hash = deed.tag

	return false

share_deed = (tag, el) ->
	el.style.backgroundColor = 'white'
	el.style.padding = 0
	el.innerHTML = '<input type="text" value="http://woubuc.github.io/wu-map/#' + tag + '" style="width:280px;padding:2px;border-radius:3px;border:1px solid #dedede;font-size:12px" onclick="this.select()" />'
	el.childNodes[0].select()
	return false


# Coordinate functions
show_coords_info = (coords) ->
	if marker isnt ''
		marker.setMap(null)
		marker = ''
	if infowin isnt ''
		do infowin.close
		infowin = ''

	infowin = new google.maps.InfoWindow
		content: '<div id="content">
			<h3>X' + Math.floor(coords.x) + ', Y' + Math.floor(coords.y) + '</h3>
			<div id="bodyContent">
				<p>There seems to be nothing special here</p>
				<p style="padding-top:10px"><a href="#' + Math.floor(coords.x) + ',' + Math.floor(coords.y) + '" style="display:inline-block;color:white;padding:3px 6px;border-radius:3px;font-size:13px;background:#2196F3;cursor:pointer;" onclick="share_coords(\'' + Math.floor(coords.x) + '\', \'' + Math.floor(coords.y) + '\', this)">Share these coordinates</a></p>
			</div>
		</div>'
		position: projection.fromPointToLatLng(projection.fromCoords(coords))
	infowin.open map
	infowin.open map

	window.location.hash = coords.x + ',' + coords.y

	return false

share_coords = (x, y, el) ->
	el.style.backgroundColor = 'white'
	el.style.padding = 0
	el.innerHTML = '<input type="text" value="http://woubuc.github.io/wu-map/#' + x + ',' + y + '" style="width:255px;padding:2px;border-radius:3px;border:1px solid #dedede;font-size:12px" onclick="this.select()" />'
	el.childNodes[0].select()
	return false


# Add menu
show_add_menu = ->
	el = document.getElementById('addmenu')
	if el.className is 'open'
		el.className = ''
	else
		el.className = 'open'

show_add_form = (which) ->
	url = switch which
		when 'deed' then 'https://docs.google.com/forms/d/1-GW1P_ImiqjYxCFSQGw_kFRbmDRbbpkCFpRbO82jb8Q/viewform?embedded=true&hl=en'
		when 'tower' then 'https://docs.google.com/forms/d/19Aa-F-2PwTmMEYZTKfbpnjDRvKvBw5ZVwhQSIDPDlQQ/viewform?embedded=true&hl=en'
		when 'mine' then 'https://docs.google.com/forms/d/10tIQppH5tsWCvMBqsg22dGVS1ids36vcr3BlhnX6aI8/viewform?embedded=true&hl=en'
		when 'resource' then 'https://docs.google.com/forms/d/1NVS_LMy0aTv8OCRnEbhnrS06QRzd40ShioUGi7jo6DU/viewform?embedded=true&hl=en'
	document.getElementById('addform').style.display = 'block'
	document.getElementById('addform').childNodes[0].src = url
	document.getElementById('addmenu').className = ''

hide_add_form = ->
	document.getElementById('addform').style.display = 'none'
	document.getElementById('addform').childNodes[0].src = 'about:blank'

update_deeds = ->
	filter = document.getElementById('search').value
	if filter is ''
		Transparency.render document.getElementById('locations'), deeds,
			view:
				href: -> '#' + @tag
				onclick: -> 'show_deed_on_map(\'' + @tag + '\')'
	else
		toShow = []
		filter = filter.toLowerCase()
		for i in deeds
			if i.name.toLowerCase().indexOf(filter) isnt -1
				toShow.push i

		Transparency.render document.getElementById('locations'), toShow,
			view:
				href: -> '#' + @tag
				onclick: -> 'show_deed_on_map(\'' + @tag + '\')'