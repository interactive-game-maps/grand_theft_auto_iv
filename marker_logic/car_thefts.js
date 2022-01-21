function getCarThefts() {
    return new InteractiveLayer('car_thefts', car_thefts, {
        name: "Stevie's car thefts",
        create_checkbox: true,
        create_feature_popup: true,
        sidebar_icon_html: '<i class="fas fa-car"></i>',
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: Utils.getCustomIcon('fa-car'),
                riseOnHover: true
            });
        }
    });
}
