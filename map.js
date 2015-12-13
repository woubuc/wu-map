var change_map, clear_home, close_infowin, deed_tags, distance, filter, find_nearby_locations, hide_add_form, hide_search, infowin, init, map, marker, projection, search, set_home, share_coords, share_deed, show_add_form, show_coords_info, show_coords_on_map, show_deed_info, show_deed_on_map, toggle_markers, toggle_serverinfo_size, toggle_sidebar, update_markers, update_stats, vote_reminder_close, vote_reminder_open,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

map = '';

marker = '';

infowin = '';

deed_tags = {};

projection = {
  size: 4096,
  mid: 2048,
  coord_multiplier: 4,
  max_lat: 90,
  max_long: 180,
  fromLatLngToPoint: function(latLng) {
    var l, x, y;
    l = latLng.lat();
    x = (function() {
      switch (false) {
        case l === 0:
          return projection.mid + (l / projection.max_lat * projection.mid);
        default:
          return projection.mid;
      }
    })();
    l = latLng.lng();
    y = (function() {
      switch (false) {
        case l === 0:
          return projection.mid + (l / projection.max_long * projection.mid);
        default:
          return projection.mid;
      }
    })();
    return new google.maps.Point(x, y);
  },
  fromPointToLatLng: function(point, noWrap) {
    var lat, long;
    if (point.x > projection.size) {
      point.x = projection.size;
    }
    if (point.y > projection.size) {
      point.y = projection.size;
    }
    if (point.x < 0) {
      point.x = 0;
    }
    if (point.y < 0) {
      point.y = 0;
    }
    lat = (function() {
      switch (false) {
        case !(point.x < projection.mid):
          return 0 - (projection.max_lat - (point.x / projection.mid * projection.max_lat));
        case !(point.x > projection.mid):
          return (point.x - projection.mid) / projection.mid * projection.max_lat;
        default:
          return 0;
      }
    })();
    long = (function() {
      switch (false) {
        case !(point.y < projection.mid):
          return 0 - (projection.max_long - (point.y / projection.mid * projection.max_long));
        case !(point.y > projection.mid):
          return (point.y - projection.mid) / projection.mid * projection.max_long;
        default:
          return 0;
      }
    })();
    return new google.maps.LatLng(lat, long);
  },
  toCoords: function(point) {
    return {
      x: point.x * projection.coord_multiplier,
      y: point.y * projection.coord_multiplier
    };
  },
  fromCoords: function(point) {
    return {
      x: point.x / projection.coord_multiplier,
      y: point.y / projection.coord_multiplier
    };
  }
};

init = function() {
  var Sklotopolis, Tiled, coords, coordsDiv, d, hash, home_deed, i, init_moved, j, k, last_reminder, len, len1, len2, len3, len4, m, p, q, r, serverinfo_size, timestr;
  init_moved = false;
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -80.035400390625,
      lng: -163.30078125
    },
    zoom: 2,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false
  });
  Sklotopolis = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
      if (coord.x === 0 && coord.y === 0) {
        return 'http://5.45.109.131/unlimited/mapdump.png';
      }
    },
    tileSize: new google.maps.Size(4096, 4096),
    maxZoom: 2,
    minZoom: 2,
    name: 'Official map dump'
  });
  Sklotopolis.projection = projection;
  map.mapTypes.set('sklotopolis', Sklotopolis);
  coordsDiv = document.getElementById('coords');
  map.controls[google.maps.ControlPosition.BOTTOM_CENTER].push(coordsDiv);
  map.addListener('mousemove', function(e) {
    var coords;
    coords = projection.toCoords(projection.fromLatLngToPoint(e.latLng));
    return document.getElementById('coordsc').textContent = 'Mouse cursor at X' + Math.floor(coords.x) + ', Y' + Math.floor(coords.y);
  });
  map.addListener('click', function(e) {
    if (typeof console !== "undefined" && console !== null) {
      console.log('Lat: ' + e.latLng.lat() + ', Long: ' + e.latLng.lng());
    }
    return show_coords_info(projection.toCoords(projection.fromLatLngToPoint(e.latLng)));
  });
  Tiled = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
      zoom = (function() {
        switch (zoom) {
          case 0:
            return 1024;
          case 1:
            return 2048;
          case 2:
            return 4096;
          case 3:
            return 8192;
          case 4:
            return 16384;
        }
      })();
      return 'http://188.226.191.32:8000/tile_' + zoom + '_' + coord.x + '_' + coord.y + '.png';
    },
    tileSize: new google.maps.Size(256, 256),
    maxZoom: 3,
    minZoom: 0,
    name: 'Tiled map (updates approx. every 4 hrs)'
  });
  Tiled.projection = projection;
  map.mapTypes.set('tiled', Tiled);
  map.setMapTypeId('tiled');
  deeds.sort(function(a, b) {
    var a_name, b_name;
    a_name = a.name.toLowerCase();
    b_name = b.name.toLowerCase();
    if (a_name.substr(0, 3) === 'the') {
      a_name = a_name.substr(4);
    }
    if (b_name.substr(0, 3) === 'the') {
      b_name = b_name.substr(4);
    }
    switch (false) {
      case !(a.top && !b.top):
        return -1;
      case !(b.top && !a.top):
        return 1;
      case !(a_name < b_name):
        return -1;
      case !(a_name > b_name):
        return 1;
      default:
        return 0;
    }
  });
  for (j = k = 0, len = deeds.length; k < len; j = ++k) {
    i = deeds[j];
    deed_tags[i.tag] = j;
    i.marker = new google.maps.Marker({
      position: projection.fromPointToLatLng(projection.fromCoords({
        x: i.x,
        y: i.y
      })),
      map: map,
      icon: {
        url: 'images/deed_' + (i.type || 'solo') + '.png',
        size: new google.maps.Size(32, 37),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(16, 37)
      }
    });
    i.marker.addListener('click', show_deed_info.bind(null, i.tag));
    if (window.location.hash.substr(1) === i.tag) {
      show_deed_on_map(i.tag);
      init_moved = true;
    }
  }
  for (m = 0, len1 = guard_towers.length; m < len1; m++) {
    i = guard_towers[m];
    i.marker = new google.maps.Marker({
      position: projection.fromPointToLatLng(projection.fromCoords({
        x: i.x,
        y: i.y
      })),
      map: map,
      icon: {
        url: 'images/guard_tower.png',
        size: new google.maps.Size(32, 37),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(16, 37)
      }
    });
    i.marker.addListener('click', show_coords_info.bind(null, {
      x: i.x,
      y: i.y
    }));
  }
  for (p = 0, len2 = resources.length; p < len2; p++) {
    i = resources[p];
    i.marker = new google.maps.Marker({
      position: projection.fromPointToLatLng(projection.fromCoords({
        x: i.x,
        y: i.y
      })),
      map: map,
      icon: {
        url: i.type === 'mine' ? 'images/mine.png' : 'images/resource.png',
        size: new google.maps.Size(32, 37),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(16, 37)
      }
    });
    i.marker.addListener('click', show_coords_info.bind(null, {
      x: i.x,
      y: i.y
    }));
  }
  for (q = 0, len3 = poi.length; q < len3; q++) {
    i = poi[q];
    i.marker = new google.maps.Marker({
      position: projection.fromPointToLatLng(projection.fromCoords({
        x: i.x,
        y: i.y
      })),
      map: map,
      icon: {
        url: 'images/' + (i.type == null ? 'poi' : 'poi_' + i.type) + '.png',
        size: new google.maps.Size(32, 37),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(16, 37)
      }
    });
    i.marker.addListener('click', show_coords_info.bind(null, {
      x: i.x,
      y: i.y
    }));
  }
  for (r = 0, len4 = trees.length; r < len4; r++) {
    i = trees[r];
    i.marker = new google.maps.Marker({
      position: projection.fromPointToLatLng(projection.fromCoords({
        x: i.x,
        y: i.y
      })),
      map: map,
      icon: {
        url: 'images/tree.png',
        size: new google.maps.Size(32, 37),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(16, 37)
      }
    });
    i.marker.addListener('click', show_coords_info.bind(null, {
      x: i.x,
      y: i.y
    }));
  }
  hash = window.location.hash.substr(1);
  if (hash.indexOf('_') !== -1) {
    hash = hash.split('_');
    if (hash.length === 2) {
      coords = {
        x: parseInt(hash[0]),
        y: parseInt(hash[1])
      };
      map.panTo(projection.fromPointToLatLng(projection.fromCoords(coords)));
      show_coords_info(coords);
      init_moved = true;
    }
  } else if (!init_moved) {
    home_deed = localStorage.getItem('wu_map_home_deed');
    if (home_deed != null) {
      if (home_deed !== '') {
        show_deed_on_map(home_deed, false);
      }
    }
  }
  map.addListener('zoom_changed', close_infowin);
  if (window.innerWidth > 1024) {
    document.body.className = 'sidebar';
  } else {
    document.body.className = 'no_sidebar';
  }
  statsRequest.then(update_stats, function(err, xhr) {
    if (typeof console !== "undefined" && console !== null) {
      return console.log(err);
    }
  });
  last_reminder = localStorage.getItem('wu_map_vote_reminder');
  if (last_reminder != null) {
    d = new Date();
    timestr = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
    if (last_reminder !== timestr) {
      vote_reminder_open();
    }
  } else {
    vote_reminder_open();
  }
  serverinfo_size = localStorage.getItem('wu_map_serverinfo_size');
  if (serverinfo_size != null) {
    document.getElementById('serverinfo').className = serverinfo_size;
    localStorage.setItem('wu_map_serverinfo_size', serverinfo_size);
  }
  return setInterval(function() {
    if (typeof console !== "undefined" && console !== null) {
      console.log('Updating stats.json');
    }
    return pegasus('http://188.226.191.32:8000/stats.json').then(update_stats, function(err, xhr) {
      if (typeof console !== "undefined" && console !== null) {
        return console.log(err);
      }
    });
  }, 61000);
};

vote_reminder_open = function() {
  return document.getElementById('vote_reminder').style.display = 'block';
};

vote_reminder_close = function() {
  var d, timestr;
  document.getElementById('vote_reminder').style.display = 'none';
  d = new Date();
  timestr = d.getDate() + '-' + d.getMonth() + '-' + d.getFullYear();
  return localStorage.setItem('wu_map_vote_reminder', timestr);
};

update_stats = function(data, xhr) {
  var check, harvest, i, k, len, len1, m, plants, ref, starfallNames;
  document.getElementById('serverinfo_status').className = data.online ? 'online' : 'offline';
  if (document.getElementById('serverinfo_players').textContent != null) {
    document.getElementById('serverinfo_players').textContent = data.players;
  } else {
    document.getElementById('serverinfo_players').innerText = data.players;
  }
  document.getElementById('serverinfo').style.display = 'block';
  harvest = [];
  starfallNames = ['Diamond', 'Saw', 'Digging', 'Leaf', 'Bear\'s', 'Snake', 'White Shark', 'Fire', 'Raven', 'Dancer', 'Omen', 'Silence'];
  check = function(starfall, week, plant, type) {
    var nextStarfall, ref, starfallNum;
    if (week === 1) {
      if (data.starfall !== starfall) {
        return;
      }
    } else {
      starfallNum = starfallNames.indexOf(starfall);
      nextStarfall = starfallNames[starfallNum + 1 === starfallNames.length ? 0 : starfallNum + 1];
      if ((ref = data.starfall) !== starfall && ref !== nextStarfall) {
        return;
      }
      if (data.starfall === starfall && data.week < week) {
        return;
      }
      if (data.starfall === nextStarfall && data.week >= week) {
        return;
      }
    }
    return harvest.push({
      plant: plant,
      type: ' ' + type
    });
  };
  check('Leaf', 1, 'Olive', 'trees');
  check('Leaf', 2, 'Oleander', 'bushes');
  check('Bear\'s', 1, 'Camellia', 'bushes');
  check('Bear\'s', 2, 'Lavender', 'bushes');
  check('Bear\'s', 3, 'Rose', 'bushes');
  check('Bear\'s', 4, 'Maple', 'trees');
  check('Fire', 1, 'Olive', 'trees');
  check('Raven', 1, 'Grape', 'bushes');
  check('Raven', 3, 'Apple', 'trees');
  check('Dancers', 1, 'Walnut', 'trees');
  check('Omen', 1, 'Lemon', 'trees');
  check('Silence', 3, 'Chestnut', 'trees');
  check('White Shark', 1, 'Cherry', 'trees');
  for (k = 0, len = trees.length; k < len; k++) {
    i = trees[k];
    i.harvest = false;
    i.marker.setIcon('images/tree.png');
  }
  if (harvest.length > 0) {
    plants = (function() {
      var len1, m, results1;
      results1 = [];
      for (m = 0, len1 = harvest.length; m < len1; m++) {
        i = harvest[m];
        results1.push(i.plant.toLowerCase());
      }
      return results1;
    })();
    for (m = 0, len1 = trees.length; m < len1; m++) {
      i = trees[m];
      if (ref = i.type.toLowerCase(), indexOf.call(plants, ref) >= 0) {
        i.harvest = true;
        i.marker.setIcon('images/tree_harvest.png');
      }
    }
    Transparency.render(document.getElementById('serverinfo_harvest_items'), harvest);
    return document.getElementById('serverinfo_harvest').style.display = 'block';
  }
};

close_infowin = function() {
  if (infowin !== '') {
    infowin.close();
    return infowin = '';
  }
};

toggle_sidebar = function() {
  if (document.body.className === 'no_sidebar') {
    document.body.className = 'sidebar';
  } else {
    document.body.className = 'no_sidebar';
  }
  return setTimeout(function() {
    return google.maps.event.trigger(map, 'resize');
  }, 100);
};

toggle_serverinfo_size = function() {
  var el, size;
  el = document.getElementById('serverinfo');
  size = el.className === '' ? 'small' : '';
  el.className = size;
  return localStorage.setItem('wu_map_serverinfo_size', size);
};

set_home = function(tag, img) {
  localStorage.setItem('wu_map_home_deed', tag);
  return show_deed_info(tag);
};

clear_home = function() {
  return localStorage.setItem('wu_map_home_deed', '');
};

show_deed_on_map = function(tag, showInfo) {
  var deed;
  if (showInfo == null) {
    showInfo = true;
  }
  deed = deeds[deed_tags[tag]];
  map.panTo(projection.fromPointToLatLng(projection.fromCoords({
    x: deed.x,
    y: deed.y
  })));
  if (showInfo) {
    show_deed_info(tag);
  }
  return false;
};

show_deed_info = function(tag) {
  var deed, home_img, html, latLng, nearby, props;
  deed = deeds[deed_tags[tag]];
  if (!filter.deeds) {
    filter.deeds = true;
    update_markers('deeds');
  }
  if (!filter['deeds_' + deed.type]) {
    filter['deeds_' + deed.type] = true;
    update_markers('deeds_' + deed.type);
  }
  if (typeof console !== "undefined" && console !== null) {
    latLng = projection.fromPointToLatLng(projection.fromCoords({
      x: deed.x,
      y: deed.y
    }));
    console.log('Lat: ' + latLng.lat() + ', Long: ' + latLng.lng());
  }
  if (infowin !== '') {
    infowin.close();
    infowin = '';
  }
  props = [];
  if (deed.type != null) {
    html = '<p style="font-style:italic;' + (deed.features == null ? 'margin-bottom:6px;' : '') + '">';
    html += (function() {
      switch (deed.type) {
        case 'solo':
          return 'Solo player';
        case 'small':
          return 'Small settlement';
        case 'large':
          return 'Large town';
      }
    })();
    if (deed.features != null) {
      if (indexOf.call(deed.features, 'recruiting') >= 0) {
        html += ' (recruiting)';
      }
    }
    html += '</p>';
    props.push(html);
  } else if (deed.features != null) {
    props.push('<p style="font-style:italic">Recruiting</p>');
  }
  if (deed.features != null) {
    html = '<p style="margin-bottom: 6px">';
    if (indexOf.call(deed.features, 'market') >= 0) {
      html += '<img src="images/feature_market.png" title="Marketplace on deed" /> ';
    }
    if (indexOf.call(deed.features, 'trader') >= 0) {
      html += '<img src="images/feature_trader.png" title="Trader on deed" /> ';
    }
    if (indexOf.call(deed.features, 'merchant') >= 0) {
      html += '<img src="images/feature_merchant.png" title="Personal Merchant on deed" /> ';
    }
    if (indexOf.call(deed.features, 'harbour') >= 0) {
      html += '<img src="images/feature_harbour.png" title="Harbour area on deed" /> ';
    }
    if (indexOf.call(deed.features, 'inn') >= 0) {
      html += '<img src="images/feature_inn.png" title="Inn on deed" /> ';
    }
    if (indexOf.call(deed.features, 'mailbox') >= 0) {
      html += '<img src="images/feature_mailbox.png" title="Mailbox on deed" /> ';
    }
    html += '</p>';
    props.push(html);
  }
  if (deed.mayor != null) {
    props.push('<p style="margin-bottom:6px">Mayor: ' + deed.mayor + (deed.supporter ? ' <img src="images/star.png">' : '') + '</p>');
  }
  props.push('<p>Coordinates: X' + deed.x + ', Y' + deed.y + '</p>');
  if (deed.note != null) {
    props.push('<p style="font-style:italic">' + deed.note + '</p>');
  }
  nearby = find_nearby_locations({
    x: deed.x,
    y: deed.y
  });
  if (nearby) {
    props.push(nearby);
  }
  home_img = '<img id="home_deed" src="images/home_off.png" style="float:right;padding:0 0 5px 5px;cursor:pointer;" onmouseenter="this.src=\'images/home_hover.png\';" onmouseleave="this.src=\'images/home_off.png\';" onclick="set_home(\'' + deed.tag + '\', this)" title="Set as home" />';
  if (localStorage.getItem('wu_map_home_deed') === deed.tag) {
    home_img = '<img id="home_deed" src="images/home_on.png" style="float:right;padding:0 0 5px 5px;cursor:pointer;" onclick="clear_home(this)" title="Clear home location" />';
  }
  infowin = new google.maps.InfoWindow({
    content: '<div id="content" style="min-width:200px"> <span>' + home_img + '</span> <h2>' + deed.name + '</h2> <div id="bodyContent">' + props.join('') + '<p style="padding-top:10px"><a href="#' + deed.tag + '" style="display:inline-block;color:white;padding:3px 6px;border-radius:3px;font-size:13px;background:#2196F3;cursor:pointer;" onclick="share_deed(\'' + deed.tag + '\', this)">Share this location</a></p> </div> </div>'
  });
  deed.marker.setMap(map);
  infowin.open(map, deed.marker);
  infowin.open(map, deed.marker);
  window.location.hash = deed.tag;
  return false;
};

share_deed = function(tag, el) {
  el.style.backgroundColor = 'white';
  el.style.padding = 0;
  el.innerHTML = '<input type="text" value="http://woubuc.github.io/wu-map/#' + tag + '" style="width:280px;padding:2px;border-radius:3px;border:1px solid #dedede;font-size:12px" onclick="this.select()" />';
  el.childNodes[0].select();
  return false;
};

show_coords_info = function(coords) {
  var coords_marker, found, html, i, k, len, len1, len2, len3, len4, len5, m, n, nearby, o, p, props, q, r, ref, ref1, s, title;
  if (marker !== '') {
    marker.setMap(null);
    marker = '';
  }
  if (infowin !== '') {
    infowin.close();
    infowin = '';
  }
  coords.x = Math.floor(coords.x);
  coords.y = Math.floor(coords.y);
  title = 'X' + coords.x + ', Y' + coords.y;
  props = [];
  found = false;
  coords_marker = '';
  if (coords.x === 2625 && coords.y === 1748) {
    props.push('<p><img src="images/not_the_coords.png" style="margin-top:10px" /></p>');
    found = true;
  } else {
    for (k = 0, len = poi.length; k < len; k++) {
      i = poi[k];
      if (i.x === coords.x && i.y === coords.y) {
        found = true;
        if (!filter.poi) {
          filter.poi = true;
          update_markers('poi');
        }
        coords_marker = i.marker;
        title = i.name;
        props.push('<p>Coordinates: X' + i.x + ', Y' + i.y + '</p>');
        if (i.description != null) {
          props.push('<p style="margin:10px 0;max-width:400px;padding:8px;background:#eee;font-style:italic">' + i.description + '</p>');
        }
      }
    }
    if (!found) {
      for (m = 0, len1 = guard_towers.length; m < len1; m++) {
        i = guard_towers[m];
        if (i.x === coords.x && i.y === coords.y) {
          found = true;
          if (!filter.guard_towers) {
            filter.guard_towers = true;
            update_markers('guard_towers');
          }
          coords_marker = i.marker;
          props.push('<p>There is a <strong style="font-weight:500">guard tower</strong> here' + (i.creator != null ? ', built by ' + i.creator : '') + '</p>');
        }
      }
    }
    if (!found) {
      for (p = 0, len2 = resources.length; p < len2; p++) {
        i = resources[p];
        if (i.x === coords.x && i.y === coords.y) {
          found = true;
          if (!filter.resources) {
            filter.resources = true;
            update_markers('resources');
          }
          coords_marker = i.marker;
          if (i.type === 'mine') {
            props.push('<p>There is a <strong style="font-weight:500">mine</strong> here</p>');
            html = '<p>It contains ';
            if (i.ores == null) {
              html += 'no';
            } else {
              ref = i.ores;
              for (n = q = 0, len3 = ref.length; q < len3; n = ++q) {
                o = ref[n];
                if (i.ores.length === 1) {
                  html += (function() {
                    switch (o) {
                      case 'iron':
                        return 'an ';
                      default:
                        return 'a ';
                    }
                  })();
                }
                html += (function() {
                  switch (n) {
                    case 0:
                      return '';
                    case i.ores.length - 1:
                      return ' and ';
                    default:
                      return ', ';
                  }
                })();
                html += o;
              }
              html += (i.ores.length === 1 ? ' vein' : ' veins') + '</p>';
            }
            if (i.features != null) {
              html += '<p>It is equipped with ';
              ref1 = i.features;
              for (n = r = 0, len4 = ref1.length; r < len4; n = ++r) {
                o = ref1[n];
                html += (function() {
                  switch (n) {
                    case 0:
                      return '';
                    case i.features.length - 1:
                      return ' and ';
                    default:
                      return ', ';
                  }
                })();
                html += 'a ' + o;
              }
              html += '</p>';
            }
            props.push(html);
          } else {
            props.push('<p>There is a <strong style="font-weight:500">' + i.size + ' ' + i.type + ' deposit</strong> here</p>');
          }
        }
      }
    }
    if (!found) {
      for (s = 0, len5 = trees.length; s < len5; s++) {
        i = trees[s];
        if (i.x === coords.x && i.y === coords.y) {
          found = true;
          coords_marker = i.marker;
          if (i.bushes) {
            props.push('<p>There are a lot of <strong style="font-weight:500">' + i.type + ' bushes</strong> around here.</p>');
            if (i.harvest) {
              props.push('<p>These bushes can be harvested right now.</p>');
            }
          } else {
            props.push('<p>The forest in this area is mostly <strong style="font-weight:500">' + i.type + ' trees</strong>.</p>');
            if (i.harvest) {
              props.push('<p>These trees can be harvested right now.</p>');
            }
          }
        }
      }
    }
  }
  if (!found) {
    props.push('<p>There seems to be nothing special here</p>');
  }
  nearby = find_nearby_locations(coords);
  if (nearby) {
    props.push(nearby);
  }
  infowin = new google.maps.InfoWindow({
    content: '<div id="content"> <h3>' + title + '</h3> <div id="bodyContent">' + props.join('') + '<p style="padding-top:10px"><a href="#' + coords.x + '_' + coords.y + '" style="display:inline-block;color:white;padding:3px 6px;border-radius:3px;font-size:13px;background:#2196F3;cursor:pointer;" onclick="share_coords(\'' + coords.x + '\', \'' + coords.y + '\', this)">Share this location</a></p> </div> </div>',
    position: projection.fromPointToLatLng(projection.fromCoords(coords))
  });
  if (coords_marker !== '') {
    infowin.open(map, coords_marker);
    infowin.open(map, coords_marker);
  } else {
    infowin.open(map);
    infowin.open(map);
  }
  window.location.hash = coords.x + '_' + coords.y;
  return false;
};

share_coords = function(x, y, el) {
  el.style.backgroundColor = 'white';
  el.style.padding = 0;
  el.innerHTML = '<input type="text" value="http://woubuc.github.io/wu-map/#' + x + '_' + y + '" style="width:255px;padding:2px;border-radius:3px;border:1px solid #dedede;font-size:12px" onclick="this.select()" />';
  el.childNodes[0].select();
  return false;
};

show_coords_on_map = function(x, y) {
  map.panTo(projection.fromPointToLatLng(projection.fromCoords({
    x: x,
    y: y
  })));
  show_coords_info({
    x: x,
    y: y
  });
  return false;
};

find_nearby_locations = function(coords) {
  var check, dist, found, k, m, max_dist, nearby, p, q, r, ref, ref1, ref2, ref3, ref4, ref5, ref6, ref7, ref8, x, y;
  check = function(x, y) {
    var i, k, len, len1, len2, len3, len4, m, p, q, r;
    for (k = 0, len = deeds.length; k < len; k++) {
      i = deeds[k];
      if (i.x === x && i.y === y) {
        return '<p style="margin-bottom:2px;color:#777;font-size:12px;"> The settlement of <a style="color:#2196F3" href="#' + i.tag + '" onclick="show_deed_on_map(\'' + i.tag + '\')">' + i.name + '</a> is nearby</p>';
      }
    }
    for (m = 0, len1 = guard_towers.length; m < len1; m++) {
      i = guard_towers[m];
      if (i.x === x && i.y === y) {
        return '<p style="margin-bottom:2px;color:#777;font-size:12px;">There is a <a style="color:#2196F3" href="#' + i.x + '_' + i.y + '" onclick="show_coords_on_map(' + i.x + ',' + i.y + ')">guard tower</a> nearby</p>';
      }
    }
    for (p = 0, len2 = resources.length; p < len2; p++) {
      i = resources[p];
      if (i.x === x && i.y === y) {
        if (i.type === 'mine') {
          return '<p style="margin-bottom:2px;color:#777;font-size:12px;">There is a <a style="color:#2196F3" href="#' + i.x + '_' + i.y + '" onclick="show_coords_on_map(' + i.x + ',' + i.y + ')">mine</a> nearby</p>';
        } else {
          return '<p style="margin-bottom:2px;color:#777;font-size:12px;">There is a <a style="color:#2196F3" href="#' + i.x + '_' + i.y + '" onclick="show_coords_on_map(' + i.x + ',' + i.y + ')">' + i.size + ' ' + i.type + ' deposit</a> nearby';
        }
      }
      for (q = 0, len3 = poi.length; q < len3; q++) {
        i = poi[q];
        if (i.x === x && i.y === y) {
          if (i.unique == null) {
            i.unique = true;
          }
          if (i.unique) {
            return '<p style="margin-bottom:2px;color:#777;font-size:12px;"><a style="color:#2196F3" href="#' + i.x + '_' + i.y + '" onclick="show_coords_on_map(' + i.x + ',' + i.y + ')">' + i.name + '</a> is nearby</p>';
          } else {
            return '<p style="margin-bottom:2px;color:#777;font-size:12px;">A <a style="color:#2196F3" href="#' + i.x + '_' + i.y + '" onclick="show_coords_on_map(' + i.x + ',' + i.y + ')">' + i.name.toLowerCase() + '</a> is nearby</p>';
          }
        }
      }
    }
    if (filter.trees) {
      for (r = 0, len4 = trees.length; r < len4; r++) {
        i = trees[r];
        if (i.x === x && i.y === y) {
          return '<p style="margin-bottom:2px;color:#777;font-size:12px;">There are a lot of <a style="color:#2196F3" href="#' + i.x + '_' + i.y + '" onclick="show_coords_on_map(' + i.x + ',' + i.y + ')">' + i.type + ' trees</a> in the area</p>';
        }
      }
    }
    return false;
  };
  nearby = [];
  max_dist = 60;
  for (dist = k = 1, ref = max_dist; 1 <= ref ? k <= ref : k >= ref; dist = 1 <= ref ? ++k : --k) {
    for (x = m = ref1 = -dist, ref2 = dist - 1; ref1 <= ref2 ? m <= ref2 : m >= ref2; x = ref1 <= ref2 ? ++m : --m) {
      y = -dist;
      found = check(coords.x + x, coords.y + y);
      if (found) {
        nearby.push(found);
      }
    }
    for (x = p = ref3 = -dist + 1, ref4 = dist; ref3 <= ref4 ? p <= ref4 : p >= ref4; x = ref3 <= ref4 ? ++p : --p) {
      y = dist;
      found = check(coords.x + x, coords.y + y);
      if (found) {
        nearby.push(found);
      }
    }
    for (y = q = ref5 = -dist, ref6 = dist - 1; ref5 <= ref6 ? q <= ref6 : q >= ref6; y = ref5 <= ref6 ? ++q : --q) {
      x = dist;
      found = check(coords.x + x, coords.y + y);
      if (found) {
        nearby.push(found);
      }
    }
    for (y = r = ref7 = -dist + 1, ref8 = dist; ref7 <= ref8 ? r <= ref8 : r >= ref8; y = ref7 <= ref8 ? ++r : --r) {
      x = -dist;
      found = check(coords.x + x, coords.y + y);
      if (found) {
        nearby.push(found);
      }
    }
  }
  if (nearby.length === 0) {
    return false;
  }
  return '<br>' + nearby.join('');
};

show_add_form = function(which) {
  var url;
  url = (function() {
    switch (which) {
      case 'deed':
        return 'https://docs.google.com/forms/d/1-GW1P_ImiqjYxCFSQGw_kFRbmDRbbpkCFpRbO82jb8Q/viewform?embedded=true&hl=en';
      case 'tower':
        return 'https://docs.google.com/forms/d/19Aa-F-2PwTmMEYZTKfbpnjDRvKvBw5ZVwhQSIDPDlQQ/viewform?embedded=true&hl=en';
      case 'mine':
        return 'https://docs.google.com/forms/d/10tIQppH5tsWCvMBqsg22dGVS1ids36vcr3BlhnX6aI8/viewform?embedded=true&hl=en';
      case 'resource':
        return 'https://docs.google.com/forms/d/1NVS_LMy0aTv8OCRnEbhnrS06QRzd40ShioUGi7jo6DU/viewform?embedded=true&hl=en';
      case 'poi':
        return 'https://docs.google.com/forms/d/1vUyH4gGvPyy1GfMRcPZ3ynX7IRh083sIoLyHo8eaeyA/viewform?embedded=true&hl=en';
      case 'trees':
        return 'https://docs.google.com/forms/d/1J8xMFQQZEGQ_5b1bsCX1wltGLz5SoV-MQQKE0ui4DrQ/viewform?embedded=true&hl=en';
      case 'report':
        return 'https://docs.google.com/forms/d/1R3gbLKem9Hw4cM73pxdqT-LJRtZBxJr_TXTjNGYLcNE/viewform?embedded=true&hl=en';
    }
  })();
  document.getElementById('addform').style.display = 'block';
  return document.getElementById('addform').childNodes[0].src = url;
};

hide_add_form = function() {
  document.getElementById('addform').style.display = 'none';
  return document.getElementById('addform').childNodes[0].src = 'about:blank';
};

hide_search = function() {
  return setTimeout(function() {
    return document.getElementById('searchbox').className = '';
  }, 200);
};

search = function() {
  var c, closest, coords, deed, dist, home_deed, i, k, len, len1, len2, len3, len4, len5, len6, len7, len8, location, m, max_length, p, q, r, results, s, searchtext, t, u, v, val;
  searchtext = document.getElementById('search').value.toLowerCase();
  results = [];
  if (searchtext !== '') {
    if (searchtext.indexOf(' near ') > -1 || searchtext.indexOf('nearby ') > -1) {
      deed = null;
      if (searchtext.indexOf(' near ') > -1) {
        location = searchtext.split(' near ');
        searchtext = location[0];
        location = location[1];
        if (location !== '') {
          home_deed = localStorage.getItem('wu_map_home_deed');
          if ((location === 'm' || location === 'me') && (home_deed != null)) {
            deed = deeds[deed_tags[home_deed]];
          } else if (location === 'n' || location === 'nt') {
            deed = deeds[deed_tags['new-town']];
          } else {
            for (k = 0, len = deeds.length; k < len; k++) {
              i = deeds[k];
              if (i.name.toLowerCase().indexOf(location) !== -1) {
                deed = i;
                break;
              }
            }
          }
        }
      } else {
        searchtext = searchtext.replace('nearby ', '');
        if (searchtext !== '') {
          home_deed = localStorage.getItem('wu_map_home_deed');
          if (home_deed != null) {
            deed = deeds[deed_tags[home_deed]];
          }
        }
      }
      if (deed !== null) {
        closest = {
          resource: {
            found: false,
            dist: 4096
          },
          forest: {
            found: false,
            dist: 4096
          }
        };
        for (m = 0, len1 = resources.length; m < len1; m++) {
          i = resources[m];
          if (i.type === 'mine') {

          } else {
            if ((i.size + ' ' + i.type).toLowerCase().indexOf(searchtext) !== -1) {
              dist = distance(deed.x, deed.y, i.x, i.y);
              if (dist < closest.resource.dist) {
                closest.resource = {
                  dist: dist,
                  found: true,
                  name: i.size.charAt(0).toUpperCase() + i.size.slice(1) + ' ' + i.type + ' deposit',
                  tag: i.x + '_' + i.y,
                  "class": 'resource',
                  sub: 'Closest one to ' + deed.name,
                  onclick: 'show_coords_on_map(' + i.x + ',' + i.y + ')'
                };
              }
            }
          }
        }
        for (p = 0, len2 = trees.length; p < len2; p++) {
          i = trees[p];
          if ((i.type + ' forest').toLowerCase().indexOf(searchtext) !== -1) {
            dist = distance(deed.x, deed.y, i.x, i.y);
            if (dist < closest.forest.dist) {
              closest.forest = {
                dist: dist,
                found: true,
                name: i.type.charAt(0).toUpperCase() + i.type.slice(1) + ' forest',
                tag: i.x + '_' + i.y,
                "class": 'forest',
                sub: 'Closest one to ' + deed.name,
                onclick: 'show_coords_on_map(' + i.x + ',' + i.y + ')'
              };
            }
          }
        }
        if (closest.resource.found) {
          results.push(closest.resource);
        }
        if (closest.forest.found) {
          results.push(closest.forest);
        }
      }
    } else {
      if (searchtext.indexOf(',') !== -1) {
        coords = searchtext.split(',');
        for (i = q = 0, len3 = coords.length; q < len3; i = ++q) {
          val = coords[i];
          coords[i] = val.replace(/([XxYy]|\s)/g, '');
        }
        if (!isNaN(coords[0]) && !isNaN(coords[1])) {
          if (coords[0] > 0 && coords[1] > 0) {
            results.push({
              name: 'X' + coords[0] + ', Y' + coords[1],
              sub: 'Go to coordinates',
              tag: coords[0] + '_' + coords[1],
              "class": 'coords',
              onclick: 'show_coords_on_map(' + Math.round(coords[0]) + ',' + Math.round(coords[1]) + ')'
            });
          }
        }
      }
      for (r = 0, len4 = poi.length; r < len4; r++) {
        i = poi[r];
        if (results.length > 8) {
          break;
        }
        if (i.name.toLowerCase().indexOf(searchtext) !== -1) {
          results.push({
            name: i.name,
            x: i.x,
            y: i.y,
            "class": i.type == null ? 'poi' : 'poi_' + i.type,
            tag: i.x + '_' + i.y,
            onclick: 'show_coords_on_map(' + i.x + ',' + i.y + ')'
          });
        }
      }
      for (s = 0, len5 = deeds.length; s < len5; s++) {
        i = deeds[s];
        if (results.length > 8) {
          break;
        }
        if (i.name.toLowerCase().indexOf(searchtext) !== -1) {
          results.push(i);
        } else if (i.mayor != null) {
          if (i.mayor.toLowerCase().indexOf(searchtext) !== -1) {
            results.push(i);
          }
        }
      }
      for (t = 0, len6 = guard_towers.length; t < len6; t++) {
        i = guard_towers[t];
        if (results.length > 8) {
          break;
        }
        if (i.creator == null) {
          continue;
        }
        if (i.creator.toLowerCase().indexOf(searchtext) !== -1) {
          c = i.creator.toLowerCase().indexOf(searchtext);
          results.push({
            name: 'Guard tower at ' + i.x + ', ' + i.y,
            sub: 'Built by ' + i.creator.slice(0, c) + '<strong>' + i.creator.slice(c, c + searchtext.length) + '</strong>' + i.creator.slice(c + searchtext.length),
            tag: i.x + '_' + i.y,
            "class": 'guard_tower',
            onclick: 'show_coords_on_map(' + i.x + ',' + i.y + ')'
          });
        }
      }
      for (u = 0, len7 = trees.length; u < len7; u++) {
        i = trees[u];
        if (results.length > 8) {
          break;
        }
        if ((i.type + ' forest').toLowerCase().indexOf(searchtext) !== -1) {
          results.push({
            name: i.type.charAt(0).toUpperCase() + i.type.slice(1) + ' forest',
            tag: i.x + '_' + i.y,
            "class": 'forest',
            sub: 'X' + i.x + ', Y' + i.y,
            onclick: 'show_coords_on_map(' + i.x + ',' + i.y + ')'
          });
        }
      }
      for (v = 0, len8 = resources.length; v < len8; v++) {
        i = resources[v];
        if (results.length > 8) {
          break;
        }
        if (i.type === 'mine') {
          continue;
        }
        if ((i.size + ' ' + i.type).toLowerCase().indexOf(searchtext) !== -1) {
          results.push({
            name: i.size.charAt(0).toUpperCase() + i.size.slice(1) + ' ' + i.type + ' deposit',
            tag: i.x + '_' + i.y,
            "class": 'resource',
            sub: 'X' + i.x + ', Y' + i.y,
            onclick: 'show_coords_on_map(' + i.x + ',' + i.y + ')'
          });
        }
      }
    }
    max_length = (function() {
      switch (false) {
        case !(window.innerHeight < 380):
          return 4;
        case !(window.innerHeight < 420):
          return 5;
        case !(window.innerHeight < 460):
          return 6;
        case !(window.innerHeight < 500):
          return 7;
        default:
          return 8;
      }
    })();
    if (results.length > max_length) {
      results = results.slice(0, max_length);
    }
    results.push({
      tag: '',
      add_deed: true,
      name: 'Can\'t find your deed?'
    });
  }
  Transparency.render(document.getElementById('searchresults'), results, {
    location: {
      "class": function() {
        return 'location' + (function() {
          switch (false) {
            case !this.type:
              return ' deed_' + this.type;
            case !this.add_deed:
              return ' single';
            case !this["class"]:
              return ' ' + this["class"];
            default:
              return '';
          }
        }).call(this);
      },
      href: function() {
        return '#' + this.tag;
      },
      onclick: function() {
        switch (false) {
          case !this.add_deed:
            return 'show_add_form(\'deed\')';
          case !this.onclick:
            return this.onclick;
          default:
            return 'show_deed_on_map(\'' + this.tag + '\')';
        }
      }
    },
    name: {
      html: function() {
        i = this.name.toLowerCase().indexOf(searchtext);
        if (i === -1) {
          return this.name;
        } else {
          return this.name.slice(0, i) + '<strong>' + this.name.slice(i, i + searchtext.length) + '</strong>' + this.name.slice(i + searchtext.length);
        }
      }
    },
    mayor: {
      html: function() {
        switch (false) {
          case !this.add_deed:
            return '';
          case !this.sub:
            return this.sub;
          case this["class"] !== 'poi':
            return this.x + ', ' + this.y;
          case !(this.mayor == null):
            return 'No mayor on record';
          default:
            i = this.mayor.toLowerCase().indexOf(searchtext);
            if (i === -1) {
              return this.mayor;
            } else {
              return this.mayor.slice(0, i) + '<strong>' + this.mayor.slice(i, i + searchtext.length) + '</strong>' + this.mayor.slice(i + searchtext.length);
            }
        }
      }
    }
  });
  if (results.length > 0) {
    return document.getElementById('searchbox').className = 'open';
  } else {
    return document.getElementById('searchbox').className = '';
  }
};

filter = {
  deeds: true,
  deeds_solo: true,
  deeds_small: true,
  deeds_large: true,
  guard_towers: true,
  resources: true,
  poi: true,
  trees: true
};

toggle_markers = function(which) {
  if (filter[which] != null) {
    filter[which] = !filter[which];
    return update_markers(which);
  }
};

update_markers = function(which) {
  var i, j, k, len, len1, len2, len3, len4, len5, len6, len7, m, p, q, r, s, t, u;
  close_infowin();
  switch (which) {
    case 'deeds':
      for (k = 0, len = deeds.length; k < len; k++) {
        i = deeds[k];
        switch (i.type) {
          case 'large':
            i.marker.setMap(filter.deeds && filter.deeds_large ? map : null);
            break;
          case 'small':
            i.marker.setMap(filter.deeds && filter.deeds_small ? map : null);
            break;
          default:
            i.marker.setMap(filter.deeds && filter.deeds_solo ? map : null);
        }
      }
      break;
    case 'deeds_solo':
      for (m = 0, len1 = deeds.length; m < len1; m++) {
        i = deeds[m];
        if (i.type === 'solo' || (i.type == null)) {
          i.marker.setMap(filter.deeds && filter.deeds_solo ? map : null);
        }
      }
      break;
    case 'deeds_small':
      for (p = 0, len2 = deeds.length; p < len2; p++) {
        i = deeds[p];
        if (i.type === 'small') {
          i.marker.setMap(filter.deeds && filter.deeds_small ? map : null);
        }
      }
      break;
    case 'deeds_large':
      for (q = 0, len3 = deeds.length; q < len3; q++) {
        i = deeds[q];
        if (i.type === 'large') {
          i.marker.setMap(filter.deeds && filter.deeds_large ? map : null);
        }
      }
      break;
    case 'guard_towers':
      for (r = 0, len4 = guard_towers.length; r < len4; r++) {
        i = guard_towers[r];
        i.marker.setMap(filter.guard_towers ? map : null);
      }
      break;
    case 'resources':
      for (s = 0, len5 = resources.length; s < len5; s++) {
        i = resources[s];
        i.marker.setMap(filter.resources ? map : null);
      }
      break;
    case 'poi':
      for (t = 0, len6 = poi.length; t < len6; t++) {
        i = poi[t];
        i.marker.setMap(filter.poi ? map : null);
      }
      break;
    case 'trees':
      for (u = 0, len7 = trees.length; u < len7; u++) {
        i = trees[u];
        i.marker.setMap(filter.trees ? map : null);
      }
  }
  for (i in filter) {
    j = filter[i];
    document.getElementById('marker_' + i).className = j ? 'selected' : '';
  }
  return false;
};

change_map = function(type) {
  switch (type) {
    case 'mapdump':
      map.setMapTypeId('mapdump');
      document.getElementById('maptype_tiled').className = '';
      document.getElementById('maptype_mapdump').className = 'selected';
      break;
    case 'tiled':
      map.setMapTypeId('tiled');
      document.getElementById('maptype_tiled').className = 'selected';
      document.getElementById('maptype_mapdump').className = '';
  }
  return false;
};

distance = function(coord_a, coord_b) {
  var x, y;
  if (arguments.length === 4) {
    coord_a = {
      x: arguments[0],
      y: arguments[1]
    };
    coord_b = {
      x: arguments[2],
      y: arguments[3]
    };
  }
  x = coord_b.x - coord_a.x;
  x = x * x;
  y = coord_b.y - coord_a.y;
  y = y * y;
  return Math.sqrt(x + y);
};
