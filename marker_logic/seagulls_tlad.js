// Create list
var seagulls_tlad_list = document.createElement('ul');
seagulls_tlad_list.className = 'collectibles_list';

// Create marker group
var seagulls_tlad_cluster = L.markerClusterGroup({
    maxClusterRadius: 40
});

L.geoJSON(seagulls_tlad, {
    pointToLayer: function (feature, latlng) {
        // custom marker
        var marker = L.marker(latlng, {
            // Simple symbols and text/numbers on markers: https://github.com/coryasilva/Leaflet.ExtraMarkers
            icon: L.ExtraMarkers.icon({
                icon: 'fa-number',
                number: feature.properties.id,
                shape: 'square',
                markerColor: 'yellow'
            }),
            interactive: false
        });

        if (!add_checkbox_for_marker(feature, marker, seagulls_tlad_list, "seagulls_tlad", seagulls_tlad_cluster)) {
            return null;
        }
        return marker;
    }
}).addTo(seagulls_tlad_cluster);

// Add list to sidebar
sidebar.addPanel({
    id: 'seagulls_tlad',
    tab: '<i class="fas fa-dove"></i>',
    title: 'Seagulls - TLaD',
    pane: '<p></p>' // placeholder to get a proper pane
});
document.getElementById('seagulls_tlad').appendChild(seagulls_tlad_list);
