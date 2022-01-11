var strangers_group_name = 'Random Encounters';
var strangers_group_id = 'strangers';
var strangers_create_checkbox = true;

var strangers_list = createSidebarTab(strangers_group_id, strangers_group_name, '<i class="fas fa-male"></i>');

var strangers_group = L.markerClusterGroup({
    maxClusterRadius: 40
});

var strangers_icon = L.Icon.Default.extend({
    options: {
        imagePath: './',
        iconUrl: 'marker/strangers.png',
        shadowUrl: 'marker/shadow.png'
    }
});

L.geoJSON(strangers, {
    pointToLayer: (feature, latlng) => {
        return L.marker(latlng, {
            icon: new strangers_icon,
            riseOnHover: true
        });
    },
    onEachFeature: (feature, layer) => {
        addPopup(feature, layer, {
            layer_group: strangers_group,
            list: strangers_list,
            list_id: strangers_group_id,
            create_checkbox: strangers_create_checkbox
        });
        saveMarker(feature, layer, {
            list_id: strangers_group_id
        });
    }
}).addTo(strangers_group);
marker.get(strangers_group_id).set('group', strangers_group);
marker.get(strangers_group_id).set('name', strangers_group_name);

if (strangers_create_checkbox) {
    setColumnCount(marker.get(strangers_group_id), strangers_list);
}
