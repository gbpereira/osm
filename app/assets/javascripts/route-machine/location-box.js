function LocationBox (aContainer, aMap) {
  var self = this,
      _container = aContainer,
      _locationItemLat = _container.find('[data-lat]'),
      _locationItemLng = _container.find('[data-lng]'),
      _locationItemAddress = _container.find('[data-location-name]'),
      _map = aMap,
      _marker = new RMMarker([], '');

  _container.on('change', '[data-marker-input]', function (aEvent) {
    if (mustRemove()) {
      // '[data-marker-input]'
    } else {
      _findGeolocalization();
    };
  });

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

          _marker = new RMMarker(location, locationFormatted);
          _marker.addTo(_map);
        }
      }
    })
  };

  function mustRemove() {
    return false;
  };
}
