var seagulls_bogt_group_name = 'Seagulls - BoGT';
var seagulls_bogt_group_id = 'seagulls_bogt';
var seagulls_bogt_create_checkbox = true;

var seagulls_bogt_list = createSidebarTab(seagulls_bogt_group_id, seagulls_bogt_group_name, '<i class="fas fa-crow"></i>');

var seagulls_bogt_group = L.markerClusterGroup({
    maxClusterRadius: 40
});

var seagulls_bogt_icon = L.Icon.Default.extend({
    options: {
        imagePath: './',
        iconUrl: 'marker/seagulls_bogt.png',
        iconRetinaUrl: 'marker/seagulls_bogt.png',
        shadowUrl: 'marker/shadow.png'
    }
});

L.geoJSON(seagulls_bogt, {
    pointToLayer: (feature, latlng) => {
        return L.marker(latlng, {
            icon: new seagulls_bogt_icon,
            riseOnHover: true
        });
    },
    onEachFeature: (feature, layer) => {
        addPopup(feature, layer, {
            layer_group: seagulls_bogt_group,
            list: seagulls_bogt_list,
            list_id: seagulls_bogt_group_id,
            create_checkbox: seagulls_bogt_create_checkbox
        });
        saveMarker(feature, layer, {
            list_id: seagulls_bogt_group_id
        });
    }
}).addTo(seagulls_bogt_group);
marker.get(seagulls_bogt_group_id).set('group', seagulls_bogt_group);
marker.get(seagulls_bogt_group_id).set('name', seagulls_bogt_group_name);

if (seagulls_bogt_create_checkbox) {
    setColumnCount(marker.get(seagulls_bogt_group_id), seagulls_bogt_list);
}
