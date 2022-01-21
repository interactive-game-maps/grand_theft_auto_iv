function getSeagullsTlad() {
    return new InteractiveLayer('seagulls_tlad', seagulls_tlad, {
        name: "Seagulls - TLaD",
        create_checkbox: true,
        create_feature_popup: true,
        sidebar_icon_html: '<i class="fas fa-dove"></i>',
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: Utils.getCustomIcon('fa-dove'),
                riseOnHover: true
            });
        }
    });
}
