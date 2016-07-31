function RouteBox (aContainer, aMap) {
  var self = this,
      _container = aContainer,
      _locationItemLat = _container.find('[data-lat]'),
      _locationItemLng = _container.find('[data-lng]'),
      _locationItemAddress = _container.find('[data-location-name]'),
      _map = aMap,
      _route = new RMRoute([]);
      // _cachedPosition = {lat: _locationItemLat.val(), lng: _locationItemLng.val()};

  function _events () {
    _container.on('change', '[data-route-input]', function (aEvent) {
      _findGeolocalization();
      // if (mustRemove()) {
      //
      // } else {
      //   _findGeolocalization();
      // };
    });
  };

  // DOM.form.on('change', '[data-route-input]', function (aEvent) {
  //   _findGeolocalization($(this).parent().parent(), _traceRoute);
  //   // DOM.RMGeocoder.call($(this).parent().parent(), _traceRoute);
  // });



  function _init () {
    _route.addTo(_map);
    // _setInitialMarker();
    console.log('initialized');
  };

  // function _setInitialMarker () {
  //   if (_notBlankMarker()) {
  //     _route = new RMMarker(_cachedPosition, _locationItemAddress.val());
  //     console.log('initial marker added');
  //   };
  // };

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
          // if (_changedLocation(location)) {
          //   _route.updateLocation(location, locationFormatted);
          //   console.log('marker updated');
          // } else {
          //   _route = new RMMarker(location, locationFormatted);
          //   _route.addTo(_map);
          //   _cachedPosition = location;
          // }
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

    console.log('route traced');

    _route.setWaypoints(waypoints);
  };

  // function _changedLocation(aLocation) {
  //   return (_cachedPosition.lat !== '' && _cachedPosition.lng !== '' && _cachedPosition.lat !== aLocation.lat && _cachedPosition.lng !== aLocation.lng);
  // };
  //
  // function _notBlankMarker () {
  //   return (_cachedPosition.lat !== '' && _cachedPosition.lng !== '');
  // };

  _init();
  _events();
}
