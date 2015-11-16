var close_infowin, deed_tags, find_nearby_locations, hide_add_form, infowin, init, map, marker, projection, share_coords, share_deed, show_add_form, show_add_menu, show_coords_info, show_coords_on_map, show_deed_info, show_deed_on_map, toggle_filter, update_deeds,
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
  var Sklotopolis, Tiled, coords, coordsDiv, hash, i, j, k, len, len1, len2, m, p;
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -80.035400390625,
      lng: -163.30078125
    },
    zoom: 2,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControlOptions: {
      mapTypeIds: ['sklotopolis', 'tiled']
    }
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
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(coordsDiv);
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
        }
      })();
      return 'http://188.226.191.32:8000/' + zoom + '_t_' + coord.x + '_' + coord.y + '.png';
    },
    tileSize: new google.maps.Size(512, 512),
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
        url: 'images/deed_' + (i.top ? 'unique' : i.type || 'solo') + '.png',
        size: new google.maps.Size(32, 37),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(16, 37)
      }
    });
    i.marker.addListener('click', show_deed_info.bind(null, i.tag));
    if (window.location.hash.substr(1) === i.tag) {
      show_deed_on_map(i.tag);
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
  hash = window.location.hash.substr(1);
  if (hash.indexOf(',') !== -1) {
    hash = hash.split(',');
    if (hash.length === 2) {
      coords = {
        x: parseInt(hash[0]),
        y: parseInt(hash[1])
      };
      map.panTo(projection.fromPointToLatLng(projection.fromCoords(coords)));
      show_coords_info(coords);
    }
  } else if (hash.indexOf('_') !== -1) {
    hash = hash.split('_');
    if (hash.length === 2) {
      coords = {
        x: parseInt(hash[0]),
        y: parseInt(hash[1])
      };
      map.panTo(projection.fromPointToLatLng(projection.fromCoords(coords)));
      show_coords_info(coords);
    }
  }
  update_deeds();
  return map.addListener('zoom_changed', close_infowin);
};

close_infowin = function() {
  if (infowin !== '') {
    infowin.close();
    return infowin = '';
  }
};

show_deed_on_map = function(tag) {
  var deed;
  deed = deeds[deed_tags[tag]];
  map.panTo(projection.fromPointToLatLng(projection.fromCoords({
    x: deed.x,
    y: deed.y
  })));
  show_deed_info(tag);
  return false;
};

show_deed_info = function(tag) {
  var deed, html, latLng, nearby, props;
  deed = deeds[deed_tags[tag]];
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
    if (indexOf.call(deed.features, 'harbour') >= 0) {
      html += '<img src="images/feature_harbour.png" title="Harbour area on deed" /> ';
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
  infowin = new google.maps.InfoWindow({
    content: '<div id="content"> <h2>' + deed.name + '</h2> <div id="bodyContent">' + props.join('') + '<p style="padding-top:10px"><a href="#' + deed.tag + '" style="display:inline-block;color:white;padding:3px 6px;border-radius:3px;font-size:13px;background:#2196F3;cursor:pointer;" onclick="share_deed(\'' + deed.tag + '\', this)">Share this deed</a></p> </div> </div>'
  });
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
  var coords_marker, found, html, i, k, len, len1, len2, len3, m, n, nearby, o, p, props, q, ref, ref1;
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
  props = [];
  found = false;
  coords_marker = '';
  for (k = 0, len = guard_towers.length; k < len; k++) {
    i = guard_towers[k];
    if (i.x === coords.x && i.y === coords.y) {
      found = true;
      coords_marker = i.marker;
      props.push('<p>There is a <strong style="font-weight:500">guard tower</strong> here' + (i.creator != null ? ', built by ' + i.creator : '') + '</p>');
    }
  }
  if (!found) {
    for (m = 0, len1 = resources.length; m < len1; m++) {
      i = resources[m];
      if (i.x === coords.x && i.y === coords.y) {
        found = true;
        coords_marker = i.marker;
        if (i.type === 'mine') {
          props.push('<p>There is a <strong style="font-weight:500">mine</strong> here</p>');
          html = '<p>It contains ';
          if (i.ores == null) {
            html += 'no';
          } else {
            ref = i.ores;
            for (n = p = 0, len2 = ref.length; p < len2; n = ++p) {
              o = ref[n];
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
            for (n = q = 0, len3 = ref1.length; q < len3; n = ++q) {
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
    props.push('<p>There seems to be nothing special here</p>');
  }
  nearby = find_nearby_locations(coords);
  if (nearby) {
    props.push(nearby);
  }
  infowin = new google.maps.InfoWindow({
    content: '<div id="content"> <h3>X' + coords.x + ', Y' + coords.y + '</h3> <div id="bodyContent">' + props.join('') + '<p style="padding-top:10px"><a href="#' + coords.x + '_' + coords.y + '" style="display:inline-block;color:white;padding:3px 6px;border-radius:3px;font-size:13px;background:#2196F3;cursor:pointer;" onclick="share_coords(\'' + coords.x + '\', \'' + coords.y + '\', this)">Share these coordinates</a></p> </div> </div>',
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
    var i, k, len, len1, len2, m, p;
    for (k = 0, len = deeds.length; k < len; k++) {
      i = deeds[k];
      if (i.x === x && i.y === y) {
        return '<p style="margin-bottom:2px;color:#666"> The settlement of <a style="color:#2196F3" href="#' + i.tag + '" onclick="show_deed_on_map(\'' + i.tag + '\')">' + i.name + '</a> is nearby</p>';
      }
    }
    for (m = 0, len1 = guard_towers.length; m < len1; m++) {
      i = guard_towers[m];
      if (i.x === x && i.y === y) {
        return '<p style="margin-bottom:2px;color:#666">There is a <a style="color:#2196F3" href="#' + i.x + '_' + i.y + '" onclick="show_coords_on_map(' + i.x + ',' + i.y + ')">guard tower</a> nearby</p>';
      }
    }
    for (p = 0, len2 = resources.length; p < len2; p++) {
      i = resources[p];
      if (i.x === x && i.y === y) {
        if (i.type === 'mine') {
          return '<p style="margin-bottom:2px;color:#666">There is a <a style="color:#2196F3" href="#' + i.x + '_' + i.y + '" onclick="show_coords_on_map(' + i.x + ',' + i.y + ')">mine</a> nearby</p>';
        } else {
          return '<p style="margin-bottom:2px;color:#666">There is a <a style="color:#2196F3" href="#' + i.x + '_' + i.y + '" onclick="show_coords_on_map(' + i.x + ',' + i.y + ')">' + i.size + ' ' + i.type + ' deposit</a> nearby';
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

show_add_menu = function() {
  var el;
  el = document.getElementById('addmenu');
  if (el.className === 'open') {
    return el.className = '';
  } else {
    return el.className = 'open';
  }
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
    }
  })();
  document.getElementById('addform').style.display = 'block';
  document.getElementById('addform').childNodes[0].src = url;
  return document.getElementById('addmenu').className = '';
};

hide_add_form = function() {
  document.getElementById('addform').style.display = 'none';
  return document.getElementById('addform').childNodes[0].src = 'about:blank';
};

update_deeds = function() {
  var filter, i, k, len, toShow;
  filter = document.getElementById('search').value;
  if (filter === '') {
    return Transparency.render(document.getElementById('locations'), deeds, {
      view: {
        href: function() {
          return '#' + this.tag;
        },
        onclick: function() {
          return 'show_deed_on_map(\'' + this.tag + '\')';
        }
      }
    });
  } else {
    toShow = [];
    filter = filter.toLowerCase();
    for (k = 0, len = deeds.length; k < len; k++) {
      i = deeds[k];
      if (i.name.toLowerCase().indexOf(filter) !== -1) {
        toShow.push(i);
      }
    }
    return Transparency.render(document.getElementById('locations'), toShow, {
      view: {
        href: function() {
          return '#' + this.tag;
        },
        onclick: function() {
          return 'show_deed_on_map(\'' + this.tag + '\')';
        }
      }
    });
  }
};

toggle_filter = function(el) {
  var i, k, len, len1, len2, len3, len4, len5, m, p, q, r, results, results1, results2, results3, results4, results5, s;
  if (el.className === 'option on') {
    el.className = 'option off';
    close_infowin();
    switch (el.id) {
      case 'filter_deeds':
        results = [];
        for (k = 0, len = deeds.length; k < len; k++) {
          i = deeds[k];
          results.push(!i.top ? i.marker.setMap(null) : void 0);
        }
        return results;
        break;
      case 'filter_towers':
        results1 = [];
        for (m = 0, len1 = guard_towers.length; m < len1; m++) {
          i = guard_towers[m];
          results1.push(i.marker.setMap(null));
        }
        return results1;
        break;
      case 'filter_resources':
        results2 = [];
        for (p = 0, len2 = resources.length; p < len2; p++) {
          i = resources[p];
          results2.push(i.marker.setMap(null));
        }
        return results2;
    }
  } else {
    el.className = 'option on';
    switch (el.id) {
      case 'filter_deeds':
        results3 = [];
        for (q = 0, len3 = deeds.length; q < len3; q++) {
          i = deeds[q];
          results3.push(!i.top ? i.marker.setMap(map) : void 0);
        }
        return results3;
        break;
      case 'filter_towers':
        results4 = [];
        for (r = 0, len4 = guard_towers.length; r < len4; r++) {
          i = guard_towers[r];
          results4.push(i.marker.setMap(map));
        }
        return results4;
        break;
      case 'filter_resources':
        results5 = [];
        for (s = 0, len5 = resources.length; s < len5; s++) {
          i = resources[s];
          results5.push(i.marker.setMap(map));
        }
        return results5;
    }
  }
};
