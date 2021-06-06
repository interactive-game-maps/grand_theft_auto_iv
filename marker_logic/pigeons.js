// Create list
var pigeons_list = document.createElement('ul');
pigeons_list.className = 'collectibles_list';

// Add list to sidebar
sidebar.addPanel({
    id: 'pigeons',
    tab: '🐦',
    title: 'Flying Rats',
    pane: '<p></p>' // placeholder to get a proper pane
});
document.getElementById('pigeons').appendChild(pigeons_list);

// Create marker group
var pigeons_group = L.markerClusterGroup({
    maxClusterRadius: 40
});

var pigeons_icon = L.Icon.Default.extend({
    options: {
        imagePath: './',
        iconUrl: 'marker/pigeons.png',
        shadowUrl: 'marker/shadow.png'
    }
});

L.geoJSON(pigeons, {
    pointToLayer: (feature, latlng) => {
        return L.marker(latlng, {
            icon: new pigeons_icon,
            riseOnHover: true
        });
    },
    onEachFeature: (feature, layer) => {
        onEachFeature(feature, layer, {
            layer_group: pigeons_group,
            list: pigeons_list,
            list_name: 'pigeons',
            create_checkbox: true
        });
    }
}).addTo(pigeons_group);
marker.get('pigeons').set("group", pigeons_group);
