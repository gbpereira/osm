function RMRoute (aWaypoints) {
  var _router = new RMRouter(),
      _waypoints = aWaypoints,
      _routing = L.Routing.control({
        autoroute: false,
        draggableWaypoints: false,
        lineOptions : {
          addWaypoints: false,
          styles: [
            {color: 'black', opacity: 0.15, weight: 8},
            {color: 'green', opacity: 0.4, weight: 6}
          ]
        },
        plan: L.Routing.plan(_waypoints, {
          createMarker: function(i, wp) {
            return L.marker(wp.latLng, {draggable: false}).bindPopup(wp.name);
          }
        }),
        router: _router,
        routeWhileDragging: false,
        showAlternatives: false,
        show: false,
        waypoints: _waypoints
      });

  return _routing;
}
