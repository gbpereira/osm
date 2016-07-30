function RMLayer() {
  _attribution = '© OpenStreetMap contributors';
  _layerUrl = 'https://api.mapbox.com/styles/v1/gbpereira/cir2rhn2e001ebom4jz2bpu0x/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2JwZXJlaXJhIiwiYSI6ImNpcjJyZzE5MjAwMThmeG5yaGIxc3Z5YWoifQ.gZE5p2h-lg4Jbz_kgsaAQQ';
  _layer = L.tileLayer(_layerUrl, {attribution: _attribution});

  return _layer;
}
