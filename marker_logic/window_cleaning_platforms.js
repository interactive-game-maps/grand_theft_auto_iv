function addWindowCleaningPlatforms(map) {
    map.addInteractiveLayer('window_cleaning_platforms', window_cleaning_platforms, {
        name: "Window cleaning platforms",
        create_feature_popup: true,
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, {
                icon: Utils.getCustomIcon('fa-city'),
                riseOnHover: true
            });
        }
    });
}
