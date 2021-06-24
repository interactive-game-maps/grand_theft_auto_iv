// Create list
var seagulls_tlad_list = document.createElement('ul');
seagulls_tlad_list.className = 'collectibles_list';

// Add list to sidebar
var seagulls_tlad_group_name = 'Seagulls - TLaD';
sidebar.addPanel({
    id: 'seagulls_tlad',
    tab: '<i class="fas fa-dove"></i>',
    title: seagulls_tlad_group_name,
    pane: '<p></p>' // placeholder to get a proper pane
});
document.getElementById('seagulls_tlad').appendChild(seagulls_tlad_list);

// Create marker group
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
        onEachFeature(feature, layer, {
            layer_group: seagulls_tlad_group,
            list: seagulls_tlad_list,
            list_name: "seagulls_tlad",
            create_checkbox: true
        });
    }
}).addTo(seagulls_tlad_group);
marker.get("seagulls_tlad").set('group', seagulls_tlad_group);
marker.get('seagulls_tlad').set('name', seagulls_tlad_group_name);
