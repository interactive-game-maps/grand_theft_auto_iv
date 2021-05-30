// Create list
var under_bridges_list = document.createElement('ul');
under_bridges_list.className = 'collectibles_list';

// Add list to sidebar
sidebar.addPanel({
    id: 'under_bridges',
    tab: '🌉',
    title: 'Under Bridges',
    pane: '<p></p>' // placeholder to get a proper pane
});
document.getElementById('under_bridges').appendChild(under_bridges_list);

// Create marker group
var under_bridges_group = L.layerGroup();

L.geoJSON(under_bridges, {
    pointToLayer: (feature, latlng) => {
        // custom marker
        return L.marker(latlng, {
            // Simple symbols and text/numbers on markers: https://github.com/coryasilva/Leaflet.ExtraMarkers
            icon: L.ExtraMarkers.icon({
                icon: 'fa-number',
                number: feature.properties.id,
                shape: 'square',
                markerColor: 'green'
            }),
            interactive: false
        });
    },
    onEachFeature: (feature, layer) => {
        onEachFeature(feature, layer, under_bridges_group, under_bridges_list, 'under_bridges', true);
    }
}).addTo(under_bridges_group);
marker.get('under_bridges').set("group", under_bridges_group);
