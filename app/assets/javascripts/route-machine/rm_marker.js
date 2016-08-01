function RMMarker (aWaypoint, aLocationName) {
  var self = this,
      _locationName = aLocationName,
      _waypoint = aWaypoint,
      _marker = L.marker(_waypoint).bindPopup('<strong>' + _locationName + '</strong>');

  _marker.updateLocation = function (aWaypoint, aLocationName) {
    _marker.setLatLng(aWaypoint).bindPopup('<strong>' + aLocationName + '</strong>');
  };

  return _marker;
}
