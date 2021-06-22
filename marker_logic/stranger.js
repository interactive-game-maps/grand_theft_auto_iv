// Create list
var strangers_list = document.createElement('ul');
strangers_list.className = 'collectibles_list';

// Add list to sidebar
sidebar.addPanel({
    id: 'strangers',
    tab: '<i class="fas fa-male"></i>',
    title: 'Random Encounters',
    pane: '<p></p>' // placeholder to get a proper pane
});
document.getElementById('strangers').appendChild(strangers_list);

// Create marker group
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
        onEachFeature(feature, layer, {
            layer_group: strangers_group,
            list: strangers_list,
            list_name: 'strangers',
            create_checkbox: true
        });
    }
}).addTo(strangers_group);
marker.get('strangers').set("group", strangers_group);
