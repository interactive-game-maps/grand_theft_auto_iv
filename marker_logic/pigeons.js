// Create list
var pigeons_list = document.createElement('ul');
pigeons_list.className = 'collectibles_list';

// Create marker group
var pigeons_group = L.markerClusterGroup({
    maxClusterRadius: 40
});

// save all marker in a map so we can access them later
var pigeons_map = new Map();

L.geoJSON(pigeons, {
    pointToLayer: function (feature, latlng) {
        // custom marker
        var marker = L.marker(latlng, {
            // Simple symbols and text/numbers on markers: https://github.com/coryasilva/Leaflet.ExtraMarkers
            icon: L.ExtraMarkers.icon({
                icon: 'fa-number',
                number: feature.properties.id,
                shape: 'square',
                markerColor: 'cyan'
            })
        });

        // Add collectibles to lists
        pigeons_map.set(feature.properties.id.toString(), marker);
        if (!add_checkbox_for_marker(feature, marker, pigeons_list, "pigeons", pigeons_group)) {
            return null;
        }
        return marker;
    },
    onEachFeature: function (feature, layer) {
        // popup with simple image and description
        layer.bindPopup("<a href='https://media.gtanet.com/gta4/images/flying-rats/" + feature.properties.number + ".jpg'><img src='https://media.gtanet.com/gta4/images/flying-rats/" + feature.properties.number + ".jpg' width='500/' /></a>" + feature.properties.description, { maxWidth: 500 });

        // rewrite url for easy copy pasta
        layer.on('popupopen', (event) => {
            history.replaceState({}, "", "index.html?list=" + "pigeons" + "&id=" + feature.properties.id);
        });
    }
}).addTo(pigeons_group);
pigeons_map.set("group", pigeons_group);

// save local list in global list of lists
marker.set("pigeons", pigeons_map);

// Add list to sidebar
sidebar.addPanel({
    id: 'pigeons',
    tab: '🐦',
    title: 'Flying Rats',
    pane: '<p></p>' // placeholder to get a proper pane
});
document.getElementById('pigeons').appendChild(pigeons_list);
