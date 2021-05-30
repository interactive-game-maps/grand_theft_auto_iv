// Create list
var seagulls_bogt_list = document.createElement('ul');
seagulls_bogt_list.className = 'collectibles_list';

// Add list to sidebar
sidebar.addPanel({
    id: 'seagulls_bogt',
    tab: '<i class="fas fa-crow"></i>',
    title: 'Seagulls - BoGT',
    pane: '<p></p>' // placeholder to get a proper pane
});
document.getElementById('seagulls_bogt').appendChild(seagulls_bogt_list);

// Create marker group
var seagulls_bogt_group = L.markerClusterGroup({
    maxClusterRadius: 40
});

L.geoJSON(seagulls_bogt, {
    pointToLayer: (feature, latlng) => {
        // custom marker
        return L.marker(latlng, {
            // Simple symbols and text/numbers on markers: https://github.com/coryasilva/Leaflet.ExtraMarkers
            icon: L.ExtraMarkers.icon({
                icon: 'fa-number',
                number: feature.properties.id,
                shape: 'square',
                markerColor: 'orange'
            }),
            interactive: false
        });
    },
    onEachFeature: (feature, layer) => {
        onEachFeature(feature, layer, seagulls_bogt_group, seagulls_bogt_list, 'seagulls_bogt', true);
    }
}).addTo(seagulls_bogt_group);
marker.get('seagulls_bogt').set("group", seagulls_bogt_group);
