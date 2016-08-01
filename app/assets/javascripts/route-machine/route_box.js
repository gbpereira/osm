function RouteBox (aContainer, aMap) {
  var self = this,
      _container = aContainer,
      _locationItemLat = _container.find('[data-lat]'),
      _locationItemLng = _container.find('[data-lng]'),
      _locationItemAddress = _container.find('[data-location-name]'),
      _map = aMap,
      _route = new RMRoute([]),
      _rlayer = null;

  function _events () {
    _container.on('change', '[data-route-input]', function (aEvent) {
      _findGeolocalization();
    });
  };

  function _init () {
    _route.addTo(_map);
    // _rlayer = L.layerGroup([_route]);
    // _map.addLayer(_rlayer);
  };

  function _findGeolocalization () {
    var data = { search: _locationItemAddress.val() },
        url = "/api/v1/geocoder";

    $.ajax({
      type: 'GET',
      data: data,
      url: url,
      dataType: 'json',
      success: function(data) {
        var status = data['status'];

        if (status == "success") {
          var result = data['data'],
              location = result['geometry']['location'],
              locationFormatted = result['formatted_address'];

          _locationItemLat.val(location.lat);
          _locationItemLng.val(location.lng);
          _locationItemAddress.val(locationFormatted);

          _traceRoute();
        }
      }
    })
  };

  function _traceRoute () {
    var waypoints = [];

    _container.parent().find('[data-route]').each(function () {
      var that = $(this),
          lat = that.find('[data-lat]').val(),
          lng = that.find('[data-lng]').val(),
          locationName = that.find('[data-location-name]').val();

      if (lat !== '' && lng !== '') {
        waypoints.push({latLng: L.latLng(lat, lng), name: locationName});
      };
    });

    // console.log(_route.getWaypoints());
    // console.log('routed');
    // _map.removeLayer(_rlayer);

    // _route = new RMRoute(waypoints);
    // _route.getPlan().setWaypoints([]);
    // $('.leaflet-zoom-animated').empty();
    _route.getPlan().setWaypoints(waypoints);

    // _rlayer = L.layerGroup([_route]);
    // _map.addLayer(_rlayer);
    // _route.update();

    // console.log(_route.getWaypoints());
  };

  _init();
  _events();
}
