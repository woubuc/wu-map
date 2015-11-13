var infowin, init, map, marker, projection, show_on_map;

map = '';

marker = '';

infowin = '';

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
  var Sklotopolis, coordsDiv;
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
  return Transparency.render(document.getElementById('locations'), locations, {
    view: {
      onclick: function() {
        return 'show_on_map(' + this.x + ', ' + this.y + ')';
      }
    }
  });
};

show_on_map = function(x, y) {
  var latLng;
  latLng = projection.fromPointToLatLng({
    x: x,
    y: y
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
    position: latLng
  });
  map.panTo(latLng);
  return false;
};
