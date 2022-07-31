function addStuntJumps(map) {
    map.addInteractiveLayer('stunt_jumps', stunt_jumps, {
        name: "Stunt jumps",
        create_checkbox: true,
        create_feature_popup: true,
        is_default: true,
        sidebar_icon_html: '<i class="fas fa-car"></i>',
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: Utils.getCustomIcon('fa-car'),
                riseOnHover: true
            });
        },
        coordsToLatLng: function (coords) {
            return gtaCoordinatesToLeaflet(coords);
        }
    });
}
