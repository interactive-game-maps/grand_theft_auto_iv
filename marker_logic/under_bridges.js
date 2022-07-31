function addUnderBridges(map) {
    map.addInteractiveLayer('under_bridges', under_bridges, {
        name: "Under bridges",
        create_checkbox: true,
        create_feature_popup: true,
        is_default: true,
        sidebar_icon_html: '🌉',
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: Utils.getCustomIcon('🌉'),
                riseOnHover: true
            });
        },
        coordsToLatLng: function (coords) {
            return gtaCoordinatesToLeaflet(coords);
        }
    });
}
