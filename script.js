function initMap() {
    const chicago = new google.maps.LatLng(41.85, -87.65);
    const map = new google.maps.Map(document.getElementById("map"), {
      center: chicago,
      zoom: 3,
    });
    const coordInfoWindow = new google.maps.InfoWindow();
  
    coordInfoWindow.setContent(createInfoWindowContent(chicago, map.getZoom()));
    coordInfoWindow.setPosition(chicago);
    coordInfoWindow.open(map);
    map.addListener("zoom_changed", () => {
      coordInfoWindow.setContent(createInfoWindowContent(chicago, map.getZoom()));
      coordInfoWindow.open(map);
    });
  }
  
  const TILE_SIZE = 256;
  
  function createInfoWindowContent(latLng, zoom) {
    const scale = 1 << zoom;
    const worldCoordinate = project(latLng);
    const pixelCoordinate = new google.maps.Point(
      Math.floor(worldCoordinate.x * scale),
      Math.floor(worldCoordinate.y * scale)
    );
    const tileCoordinate = new google.maps.Point(
      Math.floor((worldCoordinate.x * scale) / TILE_SIZE),
      Math.floor((worldCoordinate.y * scale) / TILE_SIZE)
    );
    return [
      "Chicago, IL",
      "LatLng: " + latLng,
      "Zoom level: " + zoom,
      "World Coordinate: " + worldCoordinate,
      "Pixel Coordinate: " + pixelCoordinate,
      "Tile Coordinate: " + tileCoordinate,
    ].join("<br>");
  }
 
  function project(latLng) {
    let siny = Math.sin((latLng.lat() * Math.PI) / 180);
  
    siny = Math.min(Math.max(siny, -0.9999), 0.9999);
    return new google.maps.Point(
      TILE_SIZE * (0.5 + latLng.lng() / 360),
      TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI))
    );
  }