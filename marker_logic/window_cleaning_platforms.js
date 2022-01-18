var window_cleaning_platforms_group_name = 'Window Cleaning Platforms';
var window_cleaning_platforms_group_id = 'window_cleaning_platforms';

var window_cleaning_platforms_group = L.featureGroup.subGroup(marker_cluster);

L.geoJSON(window_cleaning_platforms, {
    pointToLayer: (feature, latlng) => {
        return L.marker(latlng, {
            icon: getCustomIcon('fa-city'),
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
}).getLayers().forEach(layer => {
    window_cleaning_platforms_group.addLayer(layer);
});

marker.get(window_cleaning_platforms_group_id).set('group', window_cleaning_platforms_group);
marker.get(window_cleaning_platforms_group_id).set('name', window_cleaning_platforms_group_name);
