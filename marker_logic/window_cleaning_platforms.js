var window_cleaning_platforms_group_name = 'Window Cleaning Platforms';

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
marker.get('window_cleaning_platforms').set('group', window_cleaning_platforms_group);
marker.get('window_cleaning_platforms').set('name', window_cleaning_platforms_group_name);
