// Create list
var stunt_jumps_list = document.createElement('ul');
stunt_jumps_list.className = 'collectibles_list';

// Add list to sidebar
sidebar.addPanel({
    id: 'stunt_jumps',
    tab: '<i class="fas fa-car"></i>',
    title: 'Stunt Jumps',
    pane: '<p></p>' // placeholder to get a proper pane
});
document.getElementById('stunt_jumps').appendChild(stunt_jumps_list);

// Create marker group
var stunt_jumps_group = L.markerClusterGroup({
    maxClusterRadius: 40
});

L.geoJSON(stunt_jumps, {
    pointToLayer: (feature, latlng) => {
        // custom marker
        return L.marker(latlng, {
            // Simple symbols and text/numbers on markers: https://github.com/coryasilva/Leaflet.ExtraMarkers
            icon: L.ExtraMarkers.icon({
                icon: 'fa-number',
                number: feature.properties.id,
                shape: 'square',
                markerColor: 'red'
            })
        });
    },
    onEachFeature: (feature, layer) => {
        onEachFeature(feature, layer, stunt_jumps_group, stunt_jumps_list, 'stunt_jumps', true);
    }
}).addTo(stunt_jumps_group);
marker.get('stunt_jumps').set("group", stunt_jumps_group);
