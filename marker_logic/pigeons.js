var pigeons_group_name = 'Flying Rats';
var pigeons_group_id = 'pigeons';
var pigeons_create_checkbox = true;

var pigeons_list = createSidebarTab(pigeons_group_id, pigeons_group_name, '🐦');

var pigeons_group = L.markerClusterGroup({
    maxClusterRadius: 40
});

L.geoJSON(pigeons, {
    pointToLayer: (feature, latlng) => {
        return L.marker(latlng, {
            icon: getCustomIcon('🐦'),
            riseOnHover: true
        });
    },
    onEachFeature: (feature, layer) => {
        addPopup(feature, layer, {
            layer_group: pigeons_group,
            list: pigeons_list,
            list_id: pigeons_group_id,
            create_checkbox: pigeons_create_checkbox
        });
        saveMarker(feature, layer, {
            list_id: pigeons_group_id
        });
    }
}).addTo(pigeons_group);
marker.get(pigeons_group_id).set('group', pigeons_group);
marker.get(pigeons_group_id).set('name', pigeons_group_name);

if (pigeons_create_checkbox) {
    setColumnCount(marker.get(pigeons_group_id), pigeons_list);
}

// Add as a default layer
// This needs the display name because the layer control don't report ids
default_layers.push(pigeons_group_name);
