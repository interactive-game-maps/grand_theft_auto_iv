// Create list
var pigeons_list = document.createElement('ul');
pigeons_list.className = 'collectibles_list';

// Add list to sidebar
sidebar.addPanel({
    id: 'pigeons',
    tab: '🐦',
    title: 'Flying Rats',
    pane: '<p></p>' // placeholder to get a proper pane
});
document.getElementById('pigeons').appendChild(pigeons_list);

// Create marker group
var pigeons_group = L.markerClusterGroup({
    maxClusterRadius: 40
});

L.geoJSON(pigeons, {
    pointToLayer: (feature, latlng) => {
        // custom marker
        return L.marker(latlng, {
            // Simple symbols and text/numbers on markers: https://github.com/coryasilva/Leaflet.ExtraMarkers
            icon: L.ExtraMarkers.icon({
                icon: 'fa-number',
                number: feature.properties.id,
                shape: 'square',
                markerColor: 'cyan'
            })
        });
    },
    onEachFeature: (feature, layer) => {
        onEachFeature(feature, layer, pigeons_group, pigeons_list, 'pigeons', true);
    }
}).addTo(pigeons_group);
marker.get('pigeons').set("group", pigeons_group);
