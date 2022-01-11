var seagulls_tlad_group_name = 'Seagulls - TLaD';
var seagulls_tlad_group_id = 'seagulls_tlad';
var seagulls_tlad_create_checkbox = true;

var seagulls_tlad_list = createSidebarTab(seagulls_tlad_group_id, seagulls_tlad_group_name, '<i class="fas fa-dove"></i>');

var seagulls_tlad_group = L.markerClusterGroup({
    maxClusterRadius: 40
});

var seagulls_tlad_icon = L.Icon.Default.extend({
    options: {
        imagePath: './',
        iconUrl: 'marker/seagulls_tlad.png',
        shadowUrl: 'marker/shadow.png'
    }
});

L.geoJSON(seagulls_tlad, {
    pointToLayer: (feature, latlng) => {
        return L.marker(latlng, {
            icon: new seagulls_tlad_icon,
            riseOnHover: true
        });
    },
    onEachFeature: (feature, layer) => {
        addPopup(feature, layer, {
            layer_group: seagulls_tlad_group,
            list: seagulls_tlad_list,
            list_id: seagulls_tlad_group_id,
            create_checkbox: seagulls_tlad_create_checkbox
        });
        saveMarker(feature, layer, {
            list_id: seagulls_tlad_group_id
        });
    }
}).addTo(seagulls_tlad_group);
marker.get(seagulls_tlad_group_id).set('group', seagulls_tlad_group);
marker.get(seagulls_tlad_group_id).set('name', seagulls_tlad_group_name);

if (seagulls_tlad_create_checkbox) {
    setColumnCount(marker.get(seagulls_tlad_group_id), seagulls_tlad_list);
}
