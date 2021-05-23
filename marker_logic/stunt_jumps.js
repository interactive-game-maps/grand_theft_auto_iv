// Create list
var stunt_jumps_list = document.createElement('ul');
stunt_jumps_list.className = 'collectibles_list';

// Create marker group
var stunt_jump_cluster = L.markerClusterGroup({
    maxClusterRadius: 40
});

L.geoJSON(stunt_jumps, {
    pointToLayer: function (feature, latlng) {
        // custom marker
        var marker = L.marker(latlng, {
            // Simple symbols and text/numbers on markers: https://github.com/coryasilva/Leaflet.ExtraMarkers
            icon: L.ExtraMarkers.icon({
                icon: 'fa-number',
                number: feature.properties.id,
                shape: 'square',
                markerColor: 'red'
            })
        });

        if (!add_checkbox_for_marker(feature, marker, stunt_jumps_list, "stunt_jumps", stunt_jump_cluster)) {
            return null;
        }
        return marker;
    },
    onEachFeature: function (feature, layer) {
        // popup with simple image and description
        layer.bindPopup("<iframe width=\"500\" height=\"281\" src=\"https://www.youtube-nocookie.com/embed/" + feature.properties.video_id + "\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>" + feature.properties.description, { maxWidth: 500 });
    }
}).addTo(stunt_jump_cluster);

// Add list to sidebar
sidebar.addPanel({
    id: 'stunt_jumps',
    tab: '<i class="fas fa-car"></i>',
    title: 'Stunt Jumps',
    pane: '<p></p>' // placeholder to get a proper pane
});
document.getElementById('stunt_jumps').appendChild(stunt_jumps_list);
