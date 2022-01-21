function getStrangers() {
    return new InteractiveLayer('strangers', strangers, {
        name: "Random encounter",
        create_checkbox: true,
        create_feature_popup: true,
        sidebar_icon_html: '<i class="fas fa-male"></i>',
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: Utils.getCustomIcon('fa-male'),
                riseOnHover: true
            });
        }
    });
}
