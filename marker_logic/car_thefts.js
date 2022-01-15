var car_thefts_group_name = 'Stevies Car Thefts';
var car_thefts_group_id = 'car_thefts';
var car_thefts_create_checkbox = true;

var car_thefts_list = createSidebarTab(car_thefts_group_id, car_thefts_group_name, '<i class="fas fa-car"></i>');

var car_thefts_group = L.markerClusterGroup({
    maxClusterRadius: 40
});

L.geoJSON(car_thefts, {
    pointToLayer: (feature, latlng) => {
        return L.marker(latlng, {
            icon: getCustomIcon('fa-car'),
            riseOnHover: true
        });
    },
    onEachFeature: (feature, layer) => {
        addPopup(feature, layer, {
            layer_group: car_thefts_group,
            list: car_thefts_list,
            list_id: car_thefts_group_id,
            create_checkbox: car_thefts_create_checkbox
        });
        saveMarker(feature, layer, {
            list_id: car_thefts_group_id
        });
    }
}).addTo(car_thefts_group);
marker.get(car_thefts_group_id).set('group', car_thefts_group);
marker.get(car_thefts_group_id).set('name', car_thefts_group_name);

if (car_thefts_create_checkbox) {
    setColumnCount(marker.get(car_thefts_group_id), car_thefts_list);
}
