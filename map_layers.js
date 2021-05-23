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
    maxNativeZoom: 5,
    attribution: '<a href="https://www.gtavision.com/index.php?section=content&site=116">Map from GTAvision.com</a>, <a href="https://www.gta4.net/100-percent-completion-checklist/">Images from GTA4.net</a>',
    noWrap: true,
    detectRetina: true
});

var tiled_vector = new L.tileLayer('vector_tiles/{z}/{x}/{y}.png', {
    minNativeZoom: 2,
    maxNativeZoom: 5,
    attribution: '<a href="https://www.mapsland.com/maps/games/large-detailed-map-of-liberty-city-gta-4.jpg">Map from Mapsland</a>, <a href="https://www.gta4.net/100-percent-completion-checklist/">Images from GTA4.net</a>',
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

{// Add sidebar to map
    var sidebar = L.control.sidebar({
        autopan: true,
        closeButton: true,
        contianer: 'sidebar',
        position: 'left'
    }).addTo(map);

    // make resetting localStorage possible
    sidebar.addPanel({
        id: 'reset',
        tab: '<i class="fas fa-trash"></i>',
        position: 'bottom',
        button: () => {
            localStorage.clear();
            location.reload();
        }
    });

    var edit_mode = false;
    sidebar.addPanel({
        id: 'edit',
        tab: '<i class="fas fa-map-marked"></i>',
        title: 'Add or edit marker',
        position: 'bottom',
        button: () => {
            if (!edit_mode) {
                coordinate_finder.addTo(map);
                coordinate_finder.setLatLng(map.getCenter());
                coordinate_finder.bindPopup('Coordinate Finder').openPopup();
                edit_mode = true;
            } else {
                map.removeLayer(coordinate_finder);
                edit_mode = false;
            }
        }
    });

    sidebar.addPanel({
        id: 'visit-github',
        tab: '<i class="fab fa-github"></i>',
        position: 'bottom',
        button: 'https://github.com/interactive-game-maps/grand_theft_auto_iv'
    });

    sidebar.addPanel({
        id: 'go-back',
        tab: '<i class="fas fa-arrow-left"></i>',
        position: 'bottom',
        button: 'https://interactive-game-maps.github.io/'
    });

    // make group visible on pane opening
    sidebar.on('content', (event) => {
        map.addLayer(marker.get(event.id).get('group'));
    });
}

// global list to access marker later on
var marker = new Map();
