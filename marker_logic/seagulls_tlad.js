// Create list
var seagulls_tlad_list = document.createElement('ul');
seagulls_tlad_list.className = 'collectibles_list';

// Add list to sidebar
sidebar.addPanel({
    id: 'seagulls_tlad',
    tab: '<i class="fas fa-dove"></i>',
    title: 'Seagulls - TLaD',
    pane: '<p></p>' // placeholder to get a proper pane
});
document.getElementById('seagulls_tlad').appendChild(seagulls_tlad_list);

// Create marker group
var seagulls_tlad_group = L.markerClusterGroup({
    maxClusterRadius: 40
});

L.geoJSON(seagulls_tlad, {
    pointToLayer: (feature, latlng) => {
        // custom marker
        return L.marker(latlng, {
            // Simple symbols and text/numbers on markers: https://github.com/coryasilva/Leaflet.ExtraMarkers
            icon: L.ExtraMarkers.icon({
                icon: 'fa-number',
                number: feature.properties.id,
                shape: 'square',
                markerColor: 'yellow'
            }),
            interactive: false
        });
    },
    onEachFeature: (feature, layer) => {
        onEachFeature(feature, layer, seagulls_tlad_group, seagulls_tlad_list, 'seagulls_tlad', true);
    }
}).addTo(seagulls_tlad_group);
marker.get("seagulls_tlad").set("group", seagulls_tlad_group);
