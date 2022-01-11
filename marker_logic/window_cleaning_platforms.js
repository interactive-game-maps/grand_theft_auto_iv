var window_cleaning_platforms_group_name = 'Window Cleaning Platforms';
var window_cleaning_platforms_group_id = 'window_cleaning_platforms';

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
        addPopup(feature, layer, {
            layer_group: window_cleaning_platforms_group,
            list_id: window_cleaning_platforms_group_id
        });
        saveMarker(feature, layer, {
            list_id: window_cleaning_platforms_group_id
        });
    }
}).addTo(window_cleaning_platforms_group);
marker.get(window_cleaning_platforms_group_id).set('group', window_cleaning_platforms_group);
marker.get(window_cleaning_platforms_group_id).set('name', window_cleaning_platforms_group_name);
