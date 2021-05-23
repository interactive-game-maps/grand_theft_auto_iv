// Create list
var seagulls_bogt_list = document.createElement('ul');
seagulls_bogt_list.className = 'collectibles_list';

// Create marker group
var seagulls_bogt_cluster = L.markerClusterGroup({
    maxClusterRadius: 40
});

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

        if (!add_checkbox_for_marker(feature, marker, seagulls_bogt_list, "seagulls_bogt", seagulls_bogt_cluster)) {
            return null;
        }
        return marker;
    }
}).addTo(seagulls_bogt_cluster);

// Add list to sidebar
sidebar.addPanel({
    id: 'seagulls_bogt',
    tab: '<i class="fas fa-crow"></i>',
    title: 'Seagulls - BoGT',
    pane: '<p></p>' // placeholder to get a proper pane
});
document.getElementById('seagulls_bogt').appendChild(seagulls_bogt_list);
