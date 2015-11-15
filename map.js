var deed_tags, hide_add_form, infowin, init, map, marker, projection, share_coords, share_deed, show_add_form, show_add_menu, show_coords_info, show_deed_info, show_deed_on_map, update_deeds, update_markers,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

map = '';

marker = '';

infowin = '';

deed_tags = {};

projection = {
  size: 4096,
  mid: 2048,
  coord_multiplier: 2,
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
      x: point.x * 2,
      y: point.y * 2
    };
  },
  fromCoords: function(point) {
    return {
      x: point.x / 2,
      y: point.y / 2
    };
  }
};

init = function() {
  var Sklotopolis, Tiled, coords, coordsDiv, hash, i, img, j, k, len;
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -70.037841796875,
      lng: -146.6015625
    },
    zoom: 1,
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
    maxZoom: 1,
    minZoom: 1,
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
            return 2048;
          case 1:
            return 4096;
          case 2:
            return 8192;
        }
      })();
      return 'http://188.226.191.32:8000/' + zoom + '_t_' + coord.x + '_' + coord.y + '.png';
    },
    tileSize: new google.maps.Size(512, 512),
    maxZoom: 2,
    minZoom: 0,
    name: 'Tiled map (updates approx. hourly)'
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
    img = {
      url: 'images/deed_' + (i.top ? 'unique' : i.type || 'solo') + '.png',
      size: new google.maps.Size(32, 37),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(16, 37)
    };
    i.marker = new google.maps.Marker({
      position: projection.fromPointToLatLng(projection.fromCoords({
        x: i.x,
        y: i.y
      })),
      map: map,
      icon: img
    });
    i.marker.addListener('click', show_deed_info.bind(null, i.tag));
    if (window.location.hash.substr(1) === i.tag) {
      show_deed_on_map(i.tag);
    }
  }
  map.addListener('zoom_changed', update_markers);
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
  }
  return update_deeds();
};

update_markers = function() {
  var i, k, len, len1, m, results, results1, zoom;
  zoom = map.getZoom();
  switch (false) {
    case zoom !== 0:
      results = [];
      for (k = 0, len = deeds.length; k < len; k++) {
        i = deeds[k];
        results.push(!i.top ? i.marker.setMap(null) : void 0);
      }
      return results;
      break;
    default:
      results1 = [];
      for (m = 0, len1 = deeds.length; m < len1; m++) {
        i = deeds[m];
        results1.push(i.marker.setMap(map));
      }
      return results1;
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
  var deed, html, props;
  deed = deeds[deed_tags[tag]];
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
  if (marker !== '') {
    marker.setMap(null);
    marker = '';
  }
  if (infowin !== '') {
    infowin.close();
    infowin = '';
  }
  infowin = new google.maps.InfoWindow({
    content: '<div id="content"> <h3>X' + Math.floor(coords.x) + ', Y' + Math.floor(coords.y) + '</h3> <div id="bodyContent"> <p>There seems to be nothing special here</p> <p style="padding-top:10px"><a href="#' + Math.floor(coords.x) + ',' + Math.floor(coords.y) + '" style="display:inline-block;color:white;padding:3px 6px;border-radius:3px;font-size:13px;background:#2196F3;cursor:pointer;" onclick="share_coords(\'' + Math.floor(coords.x) + '\', \'' + Math.floor(coords.y) + '\', this)">Share these coordinates</a></p> </div> </div>',
    position: projection.fromPointToLatLng(projection.fromCoords(coords))
  });
  infowin.open(map);
  infowin.open(map);
  window.location.hash = coords.x + ',' + coords.y;
  return false;
};

share_coords = function(x, y, el) {
  el.style.backgroundColor = 'white';
  el.style.padding = 0;
  el.innerHTML = '<input type="text" value="http://woubuc.github.io/wu-map/#' + x + ',' + y + '" style="width:255px;padding:2px;border-radius:3px;border:1px solid #dedede;font-size:12px" onclick="this.select()" />';
  el.childNodes[0].select();
  return false;
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
