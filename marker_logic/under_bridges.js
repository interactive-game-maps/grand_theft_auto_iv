// Create list
var under_bridges_list = document.createElement('ul');
under_bridges_list.className = 'collectibles_list';

// Create marker group
var under_bridges_group = L.layerGroup();

// save all marker in a map so we can access them later
var under_bridges_map = new Map();

L.geoJSON(under_bridges, {
    pointToLayer: function (feature, latlng) {
        // custom marker
        var marker = L.marker(latlng, {
            // Simple symbols and text/numbers on markers: https://github.com/coryasilva/Leaflet.ExtraMarkers
            icon: L.ExtraMarkers.icon({
                icon: 'fa-number',
                number: feature.properties.id,
                shape: 'square',
                markerColor: 'green'
            }),
            interactive: false
        });

        // Add collectibles to lists
        under_bridges_map.set(feature.properties.id.toString(), marker);
        if (!add_checkbox_for_marker(feature, marker, under_bridges_list, "under_bridges", under_bridges_group)) {
            return null;
        }
        return marker;
    }
}).addTo(under_bridges_group);
under_bridges_map.set("group", under_bridges_group);

// save local list in global list of lists
marker.set("under_bridges", under_bridges_map);

// Add list to sidebar
sidebar.addPanel({
    id: 'under_bridges',
    tab: '🌉',
    title: 'Under Bridges',
    pane: '<p></p>' // placeholder to get a proper pane
});
document.getElementById('under_bridges').appendChild(under_bridges_list);
