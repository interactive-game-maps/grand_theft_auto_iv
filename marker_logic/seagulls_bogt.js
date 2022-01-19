var seagulls_bogt_layer = new InteractiveLayer('seagulls_bogt', seagulls_bogt, {
    name: "Seagulls - BoGT",
    create_checkbox: true,
    create_feature_popup: true,
    sidebar_icon_html: '<i class="fas fa-crow"></i>',
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: getCustomIcon('fa-crow'),
            riseOnHover: true
        });
    }
});

interactive_layers.set(seagulls_bogt_layer.id, seagulls_bogt_layer);
