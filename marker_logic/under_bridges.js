// Create list
var under_bridges_list = document.createElement('ul');
under_bridges_list.className = 'collectibles_list';

// Add list to sidebar
var under_bridges_group_name = 'Under Bridges';
sidebar.addPanel({
    id: 'under_bridges',
    tab: '🌉',
    title: under_bridges_group_name,
    pane: '<p></p>' // placeholder to get a proper pane
});
document.getElementById('under_bridges').appendChild(under_bridges_list);

// Create marker group
var under_bridges_group = L.layerGroup();

var under_bridges_icon = L.Icon.Default.extend({
    options: {
        imagePath: './',
        iconUrl: 'marker/under_bridges.png',
        shadowUrl: 'marker/shadow.png'
    }
});

L.geoJSON(under_bridges, {
    pointToLayer: (feature, latlng) => {
        return L.marker(latlng, {
            icon: new under_bridges_icon,
            riseOnHover: true
        });
    },
    onEachFeature: (feature, layer) => {
        onEachFeature(feature, layer, {
            layer_group: under_bridges_group,
            list: under_bridges_list,
            list_name: "under_bridges",
            create_checkbox: true
        });
    }
}).addTo(under_bridges_group);
marker.get('under_bridges').set('group', under_bridges_group);
marker.get('under_bridges').set('name', under_bridges_group_name);
