// Create list
// var window_cleaning_platforms_list = document.createElement('ul');
// window_cleaning_platforms_list.className = 'collectibles_list';

// // Add list to sidebar
// sidebar.addPanel({
//     id: 'window_cleaning_platforms',
//     tab: '🐦',
//     title: 'Window Cleaning Platforms',
//     pane: '<p></p>' // placeholder to get a proper pane
// });
// document.getElementById('window_cleaning_platforms').appendChild(window_cleaning_platforms_list);

// Create marker group
var window_cleaning_platforms_group = L.markerClusterGroup({
    maxClusterRadius: 40
});

var window_cleaning_platforms_icon = L.Icon.Default.extend({
    options: {
        imagePath: './',
        iconUrl: 'marker/window_cleaning_platforms.png',
        shadowUrl: 'marker/shadow.png'
    }
});

L.geoJSON(window_cleaning_platforms, {
    pointToLayer: (feature, latlng) => {
        return L.marker(latlng, {
            icon: new window_cleaning_platforms_icon,
            riseOnHover: true
        });
    },
    onEachFeature: (feature, layer) => {
        onEachFeature(feature, layer, {
            layer_group: window_cleaning_platforms_group,
            // list: window_cleaning_platforms_list,
            list_name: 'window_cleaning_platforms'
        });
    }
}).addTo(window_cleaning_platforms_group);
marker.get('window_cleaning_platforms').set("group", window_cleaning_platforms_group);
