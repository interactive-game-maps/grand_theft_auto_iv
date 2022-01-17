var website = 'https://github.com/interactive-game-maps/grand_theft_auto_iv';
var website_subdir = 'grand_theft_auto_iv';
var attribution = `
            <div>Images from <a href="https://www.gta4.net/100-percent-completion-checklist/">GTA4.net</a>.</div>
            `

const MAX_ZOOM = 5;

var map = L.map('map', {
    crs: L.CRS.Simple,
    // minZoom: 0,
    maxZoom: 8,
    zoom: 3
});

// Use tiled maps if possible, allows better zooming
// Make sure tiling scheme is growing downwards!
// https://github.com/Leaflet/Leaflet/issues/4333#issuecomment-199753161
// https://github.com/commenthol/gdal2tiles-leaflet
// ./gdal2tiles.py -l -p raster -w none -z 2-5 full_map.jpg map_tiles
var tiled_map = new L.tileLayer('map_tiles/{z}/{x}/{y}.png', {
    minNativeZoom: 2,
    maxNativeZoom: L.Browser.retina ? MAX_ZOOM - 1 : MAX_ZOOM, // 1 level LOWER for high pixel ratio device.
    attribution: '<a href="https://www.gtavision.com/index.php?section=content&site=116">Map from GTAvision.com</a>',
    noWrap: true,
    detectRetina: true
});

var tiled_vector = new L.tileLayer('vector_tiles/{z}/{x}/{y}.png', {
    minNativeZoom: 2,
    maxNativeZoom: L.Browser.retina ? MAX_ZOOM - 1 : MAX_ZOOM, // 1 level LOWER for high pixel ratio device.
    attribution: '<a href="https://www.mapsland.com/maps/games/large-detailed-map-of-liberty-city-gta-4.jpg">Map from Mapsland</a>',
    noWrap: true,
    detectRetina: true
});

// Map as single image
// var tile_size = [250, 219]; // Size of the tiled image in folder "0", should be <= 256, makes that marker appear at the same spot
// var image_map = L.imageOverlay("full_map.jpg", [[0, 0], [-tile_size[1], tile_size[0]]]);
// map.fitBounds(image_map.getBounds());

var baseMaps = {
    "Ingame map": tiled_map,
    "Vector map": tiled_vector
    // "Image Map": image_map
};

// Make one base layer visible by default
tiled_map.addTo(map);
