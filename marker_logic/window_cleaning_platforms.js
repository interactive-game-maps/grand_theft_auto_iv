var window_cleaning_platforms_layer = new InteractiveLayer('window_cleaning_platforms', window_cleaning_platforms, {
    name: "Window cleaning platforms",
    create_feature_popup: true,
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: getCustomIcon('fa-city'),
            riseOnHover: true
        });
    }
});

interactive_layers.set(window_cleaning_platforms_layer.id, window_cleaning_platforms_layer);
