var under_bridges_layer = new InteractiveLayer('under_bridges', under_bridges, {
    name: "Under bridges",
    create_checkbox: true,
    create_feature_popup: true,
    is_default: true,
    sidebar_icon_html: '🌉',
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: getCustomIcon('🌉'),
            riseOnHover: true
        });
    }
});

interactive_layers.set(under_bridges_layer.id, under_bridges_layer);
