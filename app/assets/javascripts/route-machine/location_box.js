function LocationBox (aContainer, aMap) {
  var self = this,
      _container = aContainer,
      _locationItemLat = _container.find('[data-lat]'),
      _locationItemLng = _container.find('[data-lng]'),
      _locationItemAddress = _container.find('[data-location-name]'),
      _map = aMap,
      _marker = new RMMarker([], ''),
      _cachedPosition = {lat: _locationItemLat.val(), lng: _locationItemLng.val()};

  function _events () {
    _container.on('change', '[data-marker-input]', function (aEvent) {
      if (mustRemove()) {

      } else {
        _findGeolocalization();
      };
    });
  };

  function _init () {
    _setInitialMarker();
  };

  function _setInitialMarker () {
    if (_notBlankMarker()) {
      _marker = new RMMarker(_cachedPosition, _locationItemAddress.val());
      _marker.addTo(_map);
    };
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

          if (_changedLocation(location)) {
            _marker.updateLocation(location, locationFormatted);
          } else {
            _marker = new RMMarker(location, locationFormatted);
            _marker.addTo(_map);
            _cachedPosition = location;
          }
        }
      }
    })
  };

  function mustRemove() {
    return false;
  };

  function _changedLocation(aLocation) {
    return (_cachedPosition.lat !== '' && _cachedPosition.lng !== '' && _cachedPosition.lat !== aLocation.lat && _cachedPosition.lng !== aLocation.lng);
  };

  function _notBlankMarker () {
    return (_cachedPosition.lat !== '' && _cachedPosition.lng !== '');
  };

  _init();
  _events();
}
