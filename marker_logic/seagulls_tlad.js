// Create list
var seagulls_tlad_list = document.createElement('ul');
seagulls_tlad_list.className = 'collectibles_list';

// Create marker group
var seagulls_tlad_group = L.markerClusterGroup({
    maxClusterRadius: 40
});

// save all marker in a map so we can access them later
var seagulls_tlad_map = new Map();

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

        // Add collectibles to lists
        seagulls_tlad_map.set(feature.properties.id.toString(), marker);
        if (!add_checkbox_for_marker(feature, marker, seagulls_tlad_list, "seagulls_tlad", seagulls_tlad_group)) {
            return null;
        }
        return marker;
    }
}).addTo(seagulls_tlad_group);
seagulls_tlad_map.set("group", seagulls_tlad_group);

// save local list in global list of lists
marker.set("seagulls_tlad", seagulls_tlad_map);

// Add list to sidebar
sidebar.addPanel({
    id: 'seagulls_tlad',
    tab: '<i class="fas fa-dove"></i>',
    title: 'Seagulls - TLaD',
    pane: '<p></p>' // placeholder to get a proper pane
});
document.getElementById('seagulls_tlad').appendChild(seagulls_tlad_list);
