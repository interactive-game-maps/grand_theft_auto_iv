var under_bridges_group_name = 'Under Bridges';
var under_bridges_group_id = 'under_bridges';
var under_bridges_create_checkbox = true;

var under_bridges_list = createSidebarTab(under_bridges_group_id, under_bridges_group_name, '🌉');

var under_bridges_group = L.layerGroup();

L.geoJSON(under_bridges, {
    pointToLayer: (feature, latlng) => {
        return L.marker(latlng, {
            icon: getCustomIcon('🌉'),
            riseOnHover: true
        });
    },
    onEachFeature: (feature, layer) => {
        addPopup(feature, layer, {
            layer_group: under_bridges_group,
            list: under_bridges_list,
            list_id: under_bridges_group_id,
            create_checkbox: true
        });
        saveMarker(feature, layer, {
            list_id: under_bridges_group_id
        });
    }
}).addTo(under_bridges_group);
marker.get(under_bridges_group_id).set('group', under_bridges_group);
marker.get(under_bridges_group_id).set('name', under_bridges_group_name);

if (under_bridges_create_checkbox) {
    setColumnCount(marker.get(under_bridges_group_id), under_bridges_list);
}

// Add as a default layer
// This needs the display name because the layer control don't report ids
default_layers.push(under_bridges_group_name);
