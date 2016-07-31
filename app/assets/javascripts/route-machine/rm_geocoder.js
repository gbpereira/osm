function RMGeocoder () {
  var self = this;

  self.call = _call;

  function _pasteDate (aResponse, aLocationItemLat, aLocationItemLng, aLocationItemAddress, aCallback) {
    var response = aResponse,
        locationData = response['data'];
        location = locationData['geometry']['location'];
        locationFormatted = locationData['formatted_address'];

    aLocationItemLat.val(location.lat);
    aLocationItemLng.val(location.lng);
    aLocationItemAddress.val(locationFormatted);

    aCallback();
  };

  function _call (aContainer, aCallback) {
    var _callback = aCallback,
        _container = aContainer,
        _locationItemLat = _container.find('[data-lat]'),
        _locationItemLng = _container.find('[data-lng]'),
        _locationItemAddress = _container.find('[data-location-name]'),
        _data = { search: _locationItemAddress.val() },
        _url = "/api/v1/geocoder";

    $.ajax({
      type: 'GET',
      data: _data,
      url: _url,
      dataType: 'json',
      success: function(response) {
        if (_success(response['status'])) {
          _pasteDate(response, _locationItemLat, _locationItemLng, _locationItemAddress, _callback);
        }
      }
    });
  }

  function _success (aStatus) {
    var expectedStatus = 'success';

    return aStatus == expectedStatus;
  };
}
