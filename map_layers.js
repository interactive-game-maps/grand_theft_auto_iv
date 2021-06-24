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

{ // Edit toolbar
    // Disable general editing
    // L.PM.setOptIn(true);

    // edit_layer.pm.applyOptionsToAllChilds({
    //     allowEditing: true
    // });

    map.pm.Toolbar.createCustomControl({
        name: 'add_layer',
        block: 'custom',
        title: 'Add custom layer',
        className: 'fas fa-plus',
        toggle: false,
        onClick: () => {
            if (!create_custom_layer()) {
                return;
            }

            var active_custom_layers = custom_layer_controls.getOverlays({
                only_active: true
            });

            var active_custom_layer = custom_layers[Object.keys(active_custom_layers)[0]]

            // Disable current active layer
            map.removeLayer(active_custom_layer);
        }
    });
    map.pm.Toolbar.createCustomControl({
        name: 'remove_layer',
        block: 'custom',
        title: 'Remove custom layer',
        className: 'fas fa-trash',
        toggle: false,
        onClick: () => {
            if (!confirm('Really delete the current custom marker layer?')) {
                return;
            }

            // should be only one because we're in edit mode
            var active_custom_layers = custom_layer_controls.getOverlays({
                only_active: true
            });
            var active_custom_layer = custom_layers[Object.keys(active_custom_layers)[0]]

            localStorage.removeItem(Object.keys(active_custom_layers)[0]);
            custom_layer_controls.removeLayer(active_custom_layer);
            map.removeLayer(active_custom_layer);
            delete custom_layers[Object.keys(active_custom_layers)[0]];

            // Remove layer from controls
            show_custom_layer_controls();
            edit_mode = false;
            map.pm.toggleControls();

            // make sure editing is disabled
            map.pm.disableDraw();
            map.pm.disableGlobalEditMode();
            map.pm.disableGlobalDragMode();
            map.pm.disableGlobalRemovalMode();
            map.pm.disableGlobalCutMode();
            map.pm.disableGlobalRotateMode();
        }
    });
    map.pm.Toolbar.createCustomControl({
        name: 'export_layer',
        block: 'custom',
        title: 'Export custom layer',
        className: 'fas fa-file-download',
        toggle: false,
        onClick: () => {
            // should be only one because we're in edit mode
            var active_custom_layers = custom_layer_controls.getOverlays({
                only_active: true
            });

            var active_custom_layer = custom_layers[Object.keys(active_custom_layers)[0]]

            console.log(active_custom_layer.toGeoJSON());
            download(Object.keys(active_custom_layers)[0] + '.json', JSON.stringify(active_custom_layer.toGeoJSON(), null, '    '));
        }
    });
    map.pm.addControls({
        position: 'bottomright',
        drawCircleMarker: false,
        oneBlock: false
    });
    map.pm.toggleControls(); // hide as default

    // Save manual edits before leaving
    window.onbeforeunload = () => {
        var array = [];

        if (Object.keys(custom_layers).length < 1) {
            localStorage.removeItem('custom_layers');
            return;
        }

        Object.keys(custom_layers).forEach(key => {
            localStorage.setItem(key, JSON.stringify(custom_layers[key].toGeoJSON()));
            array.push(key);
        });

        localStorage.setItem('custom_layers', JSON.stringify(array));
    };
}

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
            if (!confirm('Really delete all marked locations and all custom marker layers?')) {
                return;
            }

            custom_layers = {};
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
                var active_custom_layers = custom_layer_controls.getOverlays({
                    only_active: true
                });

                if (Object.keys(active_custom_layers).length < 1) {
                    if (!create_custom_layer()) {
                        return;
                    }
                } else if (Object.keys(active_custom_layers).length > 1) {
                    alert('Please select only one custom layer to edit');
                    return;
                }

                active_custom_layers = custom_layer_controls.getOverlays({
                    only_active: true
                });

                var active_custom_layer = custom_layers[Object.keys(active_custom_layers)[0]];

                map.pm.setGlobalOptions({
                    layerGroup: active_custom_layer
                });

                map.on('pm:create', e => {
                    active_custom_layer.eachLayer(layer => {
                        create_editable_popup(layer);
                    });
                });

                edit_mode = true;
                hide_custom_layer_controls();
            } else {
                // make sure editing is disabled
                map.pm.disableDraw();
                map.pm.disableGlobalEditMode();
                map.pm.disableGlobalDragMode();
                map.pm.disableGlobalRemovalMode();
                map.pm.disableGlobalCutMode();
                map.pm.disableGlobalRotateMode();

                edit_mode = false;
                show_custom_layer_controls();
            }
            map.pm.toggleControls();
        }
    });

    sidebar.addPanel({
        id: 'attributions',
        tab: '<i class="fas fa-info-circle"></i>',
        title: 'Attributions',
        position: 'bottom',
        pane: `
            <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            <div>Icons made by <a href="" title="fjstudio">fjstudio</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            <div>Icons made by <a href="https://www.flaticon.com/authors/darius-dan" title="Darius Dan">Darius Dan</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
            <div>Icons made by <a href="https://fontawesome.com" title="FontAwesome">FontAwesome</a> under <a href="https://fontawesome.com/license" title="CCA4.0">Creative Commons Attribution 4.0 International license</a></div>
            `
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
        if (event.id == 'attributions') return;

        map.addLayer(marker.get(event.id).get('group'));
        history.replaceState({}, "", "index.html?list=" + event.id);
    });

    sidebar.on('closing', () => {
        history.replaceState({}, "", "index.html");
    })
}

// global list to access marker later on
var marker = new Map();
