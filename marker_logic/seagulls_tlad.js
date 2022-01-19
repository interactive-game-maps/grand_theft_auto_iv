var seagulls_tlad_layer = new InteractiveLayer('seagulls_tlad', seagulls_tlad, {
    name: "Seagulls - TLaD",
    create_checkbox: true,
    create_feature_popup: true,
    sidebar_icon_html: '<i class="fas fa-dove"></i>',
    pointToLayer: function (feature, latlng) {
        return L.marker(latlng, {
            icon: getCustomIcon('fa-dove'),
            riseOnHover: true
        });
    }
});

interactive_layers.set(seagulls_tlad_layer.id, seagulls_tlad_layer);
