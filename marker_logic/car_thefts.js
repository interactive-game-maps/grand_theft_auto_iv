var car_thefts_layer = new InteractiveLayer('car_thefts', car_thefts, {
    name: "Stevie's car thefts",
    create_checkbox: true,
    create_feature_popup: true,
    sidebar_icon_html: '<i class="fas fa-car"></i>',
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: getCustomIcon('fa-car'),
            riseOnHover: true
        });
    }
});

interactive_layers.set(car_thefts_layer.id, car_thefts_layer);
