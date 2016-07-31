function RMMarker (aWaypoint, aLocationName) {
  var _locationName = aLocationName,
      _waypoint = aWaypoint,
      _marker = L.marker(_waypoint).bindPopup(_locationName);

  return _marker;
}
