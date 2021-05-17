var map = L.map('map', {
    crs: L.CRS.Simple,
    // minZoom: 0,
    maxZoom: 10,
    zoom: 3
});

{ // Defining base maps
    // Use tiled maps if possible, allows better zooming
    // Make sure tiling scheme is growing downwards!
    // https://github.com/Leaflet/Leaflet/issues/4333#issuecomment-199753161
    // https://github.com/commenthol/gdal2tiles-leaflet
    // ./gdal2tiles.py -l -p raster -w none -z 2-5 full_map.jpg map_tiles
    var tiled_map = new L.tileLayer('map_tiles/{z}/{x}/{y}.png', {
        minNativeZoom: 2,
        maxNativeZoom: 5,
        attribution: '<a href="https://www.gtavision.com/index.php?section=content&site=116">Map from GTAvision.com</a>, <a href="https://www.gta4.net/100-percent-completion-checklist/">Images from GTA4.net</a>',
        noWrap: true,
        detectRetina: true
    });

    var tiled_vector = new L.tileLayer('vector_tiles/{z}/{x}/{y}.png', {
        minNativeZoom: 2,
        maxNativeZoom: 5,
        attribution: '<a href="https://www.mapsland.com/maps/games/large-detailed-map-of-liberty-city-gta-4.jpg">Map from Mapsland</a>, <a href="https://www.gta4.net/100-percent-completion-checklist/">Images from GTA4.net</a>',
        noWrap: true,
        detectRetina: true
    });

    // Map as single image
    // var tile_size = [250, 219]; // Size of the tiled image in folder "0", should be <= 256, makes that marker appear at the same spot
    // var image_map = L.imageOverlay("full_map.jpg", [[0, 0], [-tile_size[1], tile_size[0]]]);
    // map.fitBounds(image_map.getBounds());

    var baseMaps = {
        "Ingame map": tiled_map,
        "Vector map": tiled_vector
        // "Image Map": image_map
    };

    // Make one base layer visible by default
    tiled_map.addTo(map);
}

{ // Helper functions
    function add_checkbox_for_marker(feature, marker, list, cluster) {
        // Add checkbox for marker
        var list_entry = document.createElement('li');
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        var label = document.createElement('label')
        label.appendChild(document.createTextNode(feature.properties.number));
        label.onclick = () => {
            // center marker
            map.setView(marker.getLatLng());
            // Opening the popup stops the animation of setView()
            // marker.openPopup();
        };
        list_entry.appendChild(checkbox);
        list_entry.appendChild(label);
        list.appendChild(list_entry);

        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                map.removeLayer(marker);
            } else {
                marker.addTo(cluster).addTo(map);
            }
        });
    }

}

{ // Defining overlay maps - markers
    // Make markers groupable to clusters
    var pigeons_cluster = L.markerClusterGroup({
        maxClusterRadius: 40
    });
    var stunt_jump_cluster = L.markerClusterGroup({
        maxClusterRadius: 40
    });

    // Add lists to sidebar
    // document.getElementById("pigeons").appendChild(document.createElement('h3')).innerText = 'Flying Rats';
    var pigeons_list = document.getElementById("pigeons").appendChild(document.createElement('ul'));
    // document.getElementById("side").appendChild(document.createElement('h3')).innerText = 'Stunt Jumps';
    var stunt_jumps_list = document.getElementById("stunt_jumps").appendChild(document.createElement('ul'));

    // Add all markers and attach popups with information
    L.geoJSON(pigeons, {
        pointToLayer: function (feature, latlng) {
            // custom marker
            var marker = L.marker(latlng, {
                // Simple symbols and text/numbers on markers: https://github.com/coryasilva/Leaflet.ExtraMarkers
                icon: L.ExtraMarkers.icon({
                    icon: 'fa-number',
                    number: feature.properties.number,
                    shape: 'square',
                    markerColor: 'cyan'
                })
            });

            add_checkbox_for_marker(feature, marker, pigeons_list, pigeons_cluster);
            return marker;
        },
        onEachFeature: function (feature, layer) {
            // popup with simple image and description
            layer.bindPopup("<a href='https://media.gtanet.com/gta4/images/flying-rats/" + feature.properties.id + ".jpg'><img src='https://media.gtanet.com/gta4/images/flying-rats/" + feature.properties.id + ".jpg' width='500/' /></a>" + feature.properties.description, { maxWidth: 500 });
        }
    }).addTo(pigeons_cluster);

    L.geoJSON(stunt_jumps, {
        pointToLayer: function (feature, latlng) {
            // custom marker
            var marker = L.marker(latlng, {
                // Simple symbols and text/numbers on markers: https://github.com/coryasilva/Leaflet.ExtraMarkers
                icon: L.ExtraMarkers.icon({
                    icon: 'fa-number',
                    number: feature.properties.number,
                    shape: 'square',
                    markerColor: 'red'
                })
            });

            add_checkbox_for_marker(feature, marker, stunt_jumps_list, stunt_jump_cluster);

            return marker;
        },
        onEachFeature: function (feature, layer) {
            // popup with simple image and description
            layer.bindPopup("<iframe width=\"500\" height=\"281\" src=\"https://www.youtube-nocookie.com/embed/" + feature.properties.video_id + "\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>" + feature.properties.description, { maxWidth: 500 });
        }
    }).addTo(stunt_jump_cluster);

    var overlayMaps = {
        "Flying Rats": pigeons_cluster,
        "Stunt Jumps": stunt_jump_cluster
    };

    // Make overlay layer visible by default
    map.addLayer(pigeons_cluster);
    map.addLayer(stunt_jump_cluster);

    // Center view over map
    map.fitBounds(pigeons_cluster.getBounds());
}

// Add user selection to map
L.control.layers(baseMaps, overlayMaps).addTo(map);

// Add siedbar to map
var sidebar = L.control.sidebar('sidebar').addTo(map);

{ // Coordinate Finder, disable after getting all positions
    // https://www.techtrail.net/creating-an-interactive-map-with-leaflet-js/
    // var marker = L.marker([0, 0], {
    // 	draggable: true,
    // }).addTo(map);
    // marker.bindPopup('LatLng Marker').openPopup();
    // marker.on('dragend', function (e) {
    // 	marker.getPopup().setContent('<span style="white-space: pre">' + JSON.stringify(marker.toGeoJSON(), null, 4) + '</span>').openOn(map);
    // });
}
