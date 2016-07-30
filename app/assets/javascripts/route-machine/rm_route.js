function RMRoute (aRouteForm, aMap) {
  _form = aRouteForm;
  _map = aMap;
  _router = new RMRouter();

  _waypoints = function () {
    var coordinates = [];

    _form.find('[data-route]').each(function () {
      var self = $(this),
          lat = self.find('[data-lat]').val(),
          lng = self.find('[data-lng]').val();

      if (lat !== '' && lng !== '') {
        coordinates.push(L.latLng(lat, lng));
      };
    });

    return coordinates
  };

  _control = L.Routing.control({
    waypoints: _waypoints(),
    router: _router,
    routeWhileDragging: false,
    autoroute: false,
    showAlternatives: false,
    show: false,
    draggableWaypoints: false,
    lineOptions : {
      addWaypoints: false,
      styles: [
        {color: 'black', opacity: 0.15, weight: 9},
        {color: 'white', opacity: 0.8, weight: 8},
        {color: 'green', opacity: 0.4, weight: 7}
      ]
    }
  });

  // _waypoints = function () {
  //   var waypoints = [];
  //
  //   _form.find('[data-route]').each(function () {
  //     var self = $(this),
  //         lat = self.find('[data-lat]').val(),
  //         lng = self.find('[data-lng]').val();
  //
  //     if (lat !== '' && lng !== '') {
  //       waypoints.push(L.latLng(lat, lng));
  //     };
  //   });
  //
  //   return waypoints
  // };

  // function _init () {
  // console.log(_waypoints);
  _control.addTo(_map);
  // }
  //
  // _init();
}
