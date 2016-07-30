function RMRouter () {
  _routerUrl = "http://localhost:5000/route/v1";
  _router = L.Routing.osrmv1({ serviceUrl: _routerUrl });

  return _router;
}
