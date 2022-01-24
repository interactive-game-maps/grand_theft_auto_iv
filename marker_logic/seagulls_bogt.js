function addSeagullsBogt(map) {
    map.addInteractiveLayer('seagulls_bogt', seagulls_bogt, {
        name: "Seagulls - BoGT",
        create_checkbox: true,
        create_feature_popup: true,
        sidebar_icon_html: '<i class="fas fa-crow"></i>',
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: Utils.getCustomIcon('fa-crow'),
                riseOnHover: true
            });
        }
    });
}
