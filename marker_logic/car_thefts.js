// Create list
var car_thefts_list = document.createElement('ul');
car_thefts_list.className = 'collectibles_list';

// Add list to sidebar
sidebar.addPanel({
    id: 'car_thefts',
    tab: '<i class="fas fa-car"></i>',
    title: 'Stevies Car Thefts',
    pane: '<p></p>' // placeholder to get a proper pane
});
document.getElementById('car_thefts').appendChild(car_thefts_list);

// Create marker group
var car_thefts_group = L.markerClusterGroup({
    maxClusterRadius: 40
});

var car_thefts_icon = L.Icon.Default.extend({
    options: {
        imagePath: './',
        iconUrl: 'marker/car_thefts.png',
        shadowUrl: 'marker/shadow.png'
    }
});

L.geoJSON(car_thefts, {
    pointToLayer: (feature, latlng) => {
        return L.marker(latlng, {
            icon: new car_thefts_icon,
            riseOnHover: true
        });
    },
    onEachFeature: (feature, layer) => {
        onEachFeature(feature, layer, {
            layer_group: car_thefts_group,
            list: car_thefts_list,
            list_name: 'car_thefts',
            create_checkbox: true
        });
    }
}).addTo(car_thefts_group);
marker.get('car_thefts').set("group", car_thefts_group);
