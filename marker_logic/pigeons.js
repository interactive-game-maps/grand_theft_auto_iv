var pigeons_layer = new InteractiveLayer('pigeons', pigeons, {
    name: "Flying rats",
    create_checkbox: true,
    create_feature_popup: true,
    is_default: true,
    sidebar_icon_html: '🐦',
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: getCustomIcon('🐦'),
            riseOnHover: true
        });
    }
});

interactive_layers.set(pigeons_layer.id, pigeons_layer);
