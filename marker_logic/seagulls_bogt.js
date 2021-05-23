// Create list
var seagulls_bogt_list = document.createElement('ul');
seagulls_bogt_list.className = 'collectibles_list';

// Create marker group
var seagulls_bogt_group = L.markerClusterGroup({
    maxClusterRadius: 40
});

// save all marker in a map so we can access them later
var seagulls_bogt_map = new Map();

L.geoJSON(seagulls_bogt, {
    pointToLayer: function (feature, latlng) {
        // custom marker
        var marker = L.marker(latlng, {
            // Simple symbols and text/numbers on markers: https://github.com/coryasilva/Leaflet.ExtraMarkers
            icon: L.ExtraMarkers.icon({
                icon: 'fa-number',
                number: feature.properties.id,
                shape: 'square',
                markerColor: 'orange'
            }),
            interactive: false
        });

        // Add collectibles to lists
        seagulls_bogt_map.set(feature.properties.id.toString(), marker);
        if (!add_checkbox_for_marker(feature, marker, seagulls_bogt_list, "seagulls_bogt", seagulls_bogt_group)) {
            return null;
        }
        return marker;
    }
}).addTo(seagulls_bogt_group);
seagulls_bogt_map.set("group", seagulls_bogt_group);

// save local list in global list of lists
marker.set("seagulls_bogt", seagulls_bogt_map);

// Add list to sidebar
sidebar.addPanel({
    id: 'seagulls_bogt',
    tab: '<i class="fas fa-crow"></i>',
    title: 'Seagulls - BoGT',
    pane: '<p></p>' // placeholder to get a proper pane
});
document.getElementById('seagulls_bogt').appendChild(seagulls_bogt_list);
