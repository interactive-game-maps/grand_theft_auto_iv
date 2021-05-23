// Create list
var stunt_jumps_list = document.createElement('ul');
stunt_jumps_list.className = 'collectibles_list';

// Create marker group
var stunt_jumps_group = L.markerClusterGroup({
    maxClusterRadius: 40
});

// save all marker in a map so we can access them later
var stunt_jumps_map = new Map();

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

        // Add collectibles to lists
        stunt_jumps_map.set(feature.properties.id.toString(), marker);
        if (!add_checkbox_for_marker(feature, marker, stunt_jumps_list, "stunt_jumps", stunt_jumps_group)) {
            return null;
        }
        return marker;
    },
    onEachFeature: function (feature, layer) {
        // popup with simple image and description
        layer.bindPopup("<iframe width=\"500\" height=\"281\" src=\"https://www.youtube-nocookie.com/embed/" + feature.properties.video_id + "\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>" + feature.properties.description, { maxWidth: 500 });

        // rewrite url for easy copy pasta
        layer.on('popupopen', (event) => {
            history.replaceState({}, "", "index.html?list=" + "stunt_jumps" + "&id=" + feature.properties.id);
        });
    }
}).addTo(stunt_jumps_group);
stunt_jumps_map.set("group", stunt_jumps_group);

// save local list in global list of lists
marker.set("stunt_jumps", stunt_jumps_map);

// Add list to sidebar
sidebar.addPanel({
    id: 'stunt_jumps',
    tab: '<i class="fas fa-car"></i>',
    title: 'Stunt Jumps',
    pane: '<p></p>' // placeholder to get a proper pane
});
document.getElementById('stunt_jumps').appendChild(stunt_jumps_list);
