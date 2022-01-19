var window_cleaning_platforms_layer = new InteractiveLayer('window_cleaning_platforms', window_cleaning_platforms, {
    name: "Window cleaning platforms",
    create_feature_popup: true,
    sidebar_icon_html: '🌉',
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: getCustomIcon('🌉'),
            riseOnHover: true
        });
    }
});

interactive_layers.set(window_cleaning_platforms_layer.id, window_cleaning_platforms_layer);
