function RMMap (aContainerId, aLatitude, aLongitude, aZoom) {
  var _layer = new RMLayer(),
      _map = new L.map(aContainerId).setView([aLatitude, aLongitude], aZoom);

  _layer.addTo(_map);

  return _map;
}
