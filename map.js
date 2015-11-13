var infowin, init, location_tags, map, marker, projection, share_location, show_add_form, show_on_map, update_locations;

map = '';

marker = '';

infowin = '';

location_tags = {};

projection = {
  size: 4096,
  mid: 2048,
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
  }
};

init = function() {
  var Sklotopolis, coordsDiv, i, j, k, len;
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -50.1416015625,
      lng: -113.203125
    },
    zoom: 0,
    zoomControl: false,
    streetViewControl: false,
    mapTypeControlOptions: {
      mapTypeIds: ['sklotopolis']
    }
  });
  Sklotopolis = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
      if (coord.x === 0 && coord.y === 0) {
        return 'http://5.45.109.131/unlimited/mapdump.png';
      }
    },
    tileSize: new google.maps.Size(4096, 4096),
    maxZoom: 0,
    minZoom: 0,
    name: 'Sklotopolis'
  });
  Sklotopolis.projection = projection;
  coordsDiv = document.getElementById('coords');
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(coordsDiv);
  map.addListener('mousemove', function(e) {
    var coords;
    coords = projection.fromLatLngToPoint(e.latLng);
    return document.getElementById('coordsc').textContent = 'X' + coords.x + ', Y' + coords.y;
  });
  map.addListener('click', function(e) {
    var coords;
    if (typeof console !== "undefined" && console !== null) {
      console.log('Lat: ' + e.latLng.lat() + ', Long: ' + e.latLng.lng());
    }
    if (marker !== '') {
      marker.setMap(null);
      marker = '';
    }
    if (infowin !== '') {
      infowin.close();
      infowin = '';
    }
    coords = projection.fromLatLngToPoint(e.latLng);
    infowin = new google.maps.InfoWindow({
      content: 'X' + coords.x + ', Y' + coords.y,
      position: e.latLng
    });
    infowin.open(map);
    return infowin.open(map);
  });
  map.mapTypes.set('sklotopolis', Sklotopolis);
  map.setMapTypeId('sklotopolis');
  locations.sort(function(a, b) {
    switch (false) {
      case !(a.top && !b.top):
        return -1;
      case !(b.top && !a.top):
        return 1;
      case !(a.name < b.name):
        return -1;
      case !(a.name > b.name):
        return 1;
      default:
        return 0;
    }
  });
  for (j = k = 0, len = locations.length; k < len; j = ++k) {
    i = locations[j];
    location_tags[i.tag] = j;
    if (window.location.hash.substr(1) === i.tag) {
      show_on_map(i.tag);
    }
  }
  return update_locations();
};

show_on_map = function(tag) {
  var latLng, location;
  location = locations[location_tags[tag]];
  latLng = projection.fromPointToLatLng({
    x: location.x,
    y: location.y
  });
  if (marker !== '') {
    marker.setMap(null);
    marker = '';
  }
  if (infowin !== '') {
    infowin.close();
    infowin = '';
  }
  marker = new google.maps.Marker({
    map: map,
    draggable: false,
    animation: google.maps.Animation.DROP,
    position: latLng,
    title: location.name
  });
  marker.addListener('click', function(e) {
    var props;
    if (infowin !== '') {
      infowin.close();
      infowin = '';
    }
    props = [];
    if (location.mayor != null) {
      props.push('<p>Mayor: ' + location.mayor + '</p>');
    }
    infowin = new google.maps.InfoWindow({
      content: '<div id="content"> <h2>' + location.name + '</h2> <div id="bodyContent"> <p>Coordinates: X' + location.x + ', Y' + location.y + '</p>' + props.join('') + '<p style="padding-top:10px"><a href="#' + location.tag + '" style="display:inline-block;color:white;padding:3px 6px;border-radius:3px;font-size:13px;background:#2196F3;cursor:pointer;" onclick="share_location(\'' + location.tag + '\', this)">Share this location</a></p> </div> </div>'
    });
    infowin.open(map, marker);
    return infowin.open(map, marker);
  });
  map.panTo(latLng);
  return false;
};

share_location = function(tag, el) {
  el.style.backgroundColor = 'white';
  el.style.padding = 0;
  el.innerHTML = '<input type="text" value="http://woubuc.github.io/wu-map/#' + tag + '" style="width:280px;padding:2px;border-radius:3px;border:1px solid #dedede;font-size:12px" onclick="this.select()" />';
  el.childNodes[0].select();
  return false;
};

show_add_form = function() {
  document.getElementById('addform').style.display = 'block';
  if (document.getElementById('addform').childNodes[0].src === 'about:blank') {
    return document.getElementById('addform').childNodes[0].src = 'https://docs.google.com/forms/d/1-GW1P_ImiqjYxCFSQGw_kFRbmDRbbpkCFpRbO82jb8Q/viewform?embedded=true&hl=en';
  }
};

update_locations = function() {
  var filter, i, k, len, toShow;
  filter = document.getElementById('search').value;
  if (filter === '') {
    return Transparency.render(document.getElementById('locations'), locations, {
      view: {
        href: function() {
          return '#' + this.tag;
        },
        onclick: function() {
          return 'show_on_map(\'' + this.tag + '\')';
        }
      }
    });
  } else {
    toShow = [];
    filter = filter.toLowerCase();
    for (k = 0, len = locations.length; k < len; k++) {
      i = locations[k];
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
          return 'show_on_map(\'' + this.tag + '\')';
        }
      }
    });
  }
};
