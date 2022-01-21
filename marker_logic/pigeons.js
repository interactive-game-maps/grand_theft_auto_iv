function getPigeons() {
    return new InteractiveLayer('pigeons', pigeons, {
        name: "Flying rats",
        create_checkbox: true,
        create_feature_popup: true,
        is_default: true,
        sidebar_icon_html: '🐦',
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: Utils.getCustomIcon('🐦'),
                riseOnHover: true
            });
        }
    });
}
