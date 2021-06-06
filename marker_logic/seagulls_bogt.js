// Create list
var seagulls_bogt_list = document.createElement('ul');
seagulls_bogt_list.className = 'collectibles_list';

// Add list to sidebar
sidebar.addPanel({
    id: 'seagulls_bogt',
    tab: '<i class="fas fa-crow"></i>',
    title: 'Seagulls - BoGT',
    pane: '<p></p>' // placeholder to get a proper pane
});
document.getElementById('seagulls_bogt').appendChild(seagulls_bogt_list);

// Create marker group
var seagulls_bogt_group = L.markerClusterGroup({
    maxClusterRadius: 40
});

var seagulls_bogt_icon = L.Icon.Default.extend({
    options: {
        imagePath: './',
        iconUrl: 'marker/seagulls_bogt.png',
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
        onEachFeature(feature, layer, {
            layer_group: seagulls_bogt_group,
            list: seagulls_bogt_list,
            list_name: "seagulls_bogt",
            create_checkbox: true
        });
    }
}).addTo(seagulls_bogt_group);
marker.get('seagulls_bogt').set("group", seagulls_bogt_group);
