{ // Helper functions
    function add_checkbox_for_marker(feature, marker, list, list_name, cluster) {
        // Add checkbox for marker
        var list_entry = document.createElement('li');
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        var label = document.createElement('label')
        label.appendChild(document.createTextNode(feature.properties.id));
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
                cluster.removeLayer(marker);
                // save to localStorage
                localStorage.setItem(list_name + ":" + feature.properties.id, true);
            } else {
                marker.addTo(cluster);
                // remove from localStorage
                localStorage.removeItem(list_name + ":" + feature.properties.id);
            }
        });

        // hide if checked previously
        if (localStorage.getItem(list_name + ":" + feature.properties.id)) {
            checkbox.checked = true;
            return false;
        }

        return true;
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
    var under_bridges_group = L.layerGroup();
    var seagulls_tlad_cluster = L.markerClusterGroup({
        maxClusterRadius: 40
    });
    var seagulls_bogt_cluster = L.markerClusterGroup({
        maxClusterRadius: 40
    });

    // Add lists to sidebar
    var pigeons_list = document.getElementById("pigeons").appendChild(document.createElement('ul'));
    var stunt_jumps_list = document.getElementById("stunt_jumps").appendChild(document.createElement('ul'));
    var under_bridges_list = document.getElementById("under_bridges").appendChild(document.createElement('ul'));
    var seagulls_tlad_list = document.getElementById("seagulls_tlad").appendChild(document.createElement('ul'));
    var seagulls_bogt_list = document.getElementById("seagulls_bogt").appendChild(document.createElement('ul'));

    // Add all markers and attach popups with information
    L.geoJSON(pigeons, {
        pointToLayer: function (feature, latlng) {
            // custom marker
            var marker = L.marker(latlng, {
                // Simple symbols and text/numbers on markers: https://github.com/coryasilva/Leaflet.ExtraMarkers
                icon: L.ExtraMarkers.icon({
                    icon: 'fa-number',
                    number: feature.properties.id,
                    shape: 'square',
                    markerColor: 'cyan'
                })
            });

            if (!add_checkbox_for_marker(feature, marker, pigeons_list, "pigeons", pigeons_cluster)) {
                return null;
            }
            return marker;
        },
        onEachFeature: function (feature, layer) {
            // popup with simple image and description
            layer.bindPopup("<a href='https://media.gtanet.com/gta4/images/flying-rats/" + feature.properties.number + ".jpg'><img src='https://media.gtanet.com/gta4/images/flying-rats/" + feature.properties.number + ".jpg' width='500/' /></a>" + feature.properties.description, { maxWidth: 500 });
        }
    }).addTo(pigeons_cluster);

    L.geoJSON(stunt_jumps, {
        pointToLayer: function (feature, latlng) {
            // custom marker
            var marker = L.marker(latlng, {
                // Simple symbols and text/numbers on markers: https://github.com/coryasilva/Leaflet.ExtraMarkers
                icon: L.ExtraMarkers.icon({
                    icon: 'fa-number',
                    number: feature.properties.id,
                    shape: 'square',
                    markerColor: 'red'
                })
            });

            if (!add_checkbox_for_marker(feature, marker, stunt_jumps_list, "stunt_jumps", stunt_jump_cluster)) {
                return null;
            }
            return marker;
        },
        onEachFeature: function (feature, layer) {
            // popup with simple image and description
            layer.bindPopup("<iframe width=\"500\" height=\"281\" src=\"https://www.youtube-nocookie.com/embed/" + feature.properties.video_id + "\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>" + feature.properties.description, { maxWidth: 500 });
        }
    }).addTo(stunt_jump_cluster);

    L.geoJSON(under_bridges, {
        pointToLayer: function (feature, latlng) {
            // custom marker
            var marker = L.marker(latlng, {
                // Simple symbols and text/numbers on markers: https://github.com/coryasilva/Leaflet.ExtraMarkers
                icon: L.ExtraMarkers.icon({
                    icon: 'fa-number',
                    number: feature.properties.id,
                    shape: 'square',
                    markerColor: 'green'
                }),
                interactive: false
            });

            if (!add_checkbox_for_marker(feature, marker, under_bridges_list, "under_bridges", under_bridges_group)) {
                return null;
            }
            return marker;
        }
    }).addTo(under_bridges_group);

    L.geoJSON(seagulls_bogt, {
        pointToLayer: function (feature, latlng) {
            // custom marker
            var marker = L.marker(latlng, {
                // Simple symbols and text/numbers on markers: https://github.com/coryasilva/Leaflet.ExtraMarkers
                icon: L.ExtraMarkers.icon({
                    icon: 'fa-number',
                    number: feature.properties.id,
                    shape: 'square',
                    markerColor: 'orange'
                }),
                interactive: false
            });

            if (!add_checkbox_for_marker(feature, marker, seagulls_bogt_list, "seagulls_bogt", seagulls_bogt_cluster)) {
                return null;
            }
            return marker;
        }
    }).addTo(seagulls_bogt_cluster);

    L.geoJSON(seagulls_tlad, {
        pointToLayer: function (feature, latlng) {
            // custom marker
            var marker = L.marker(latlng, {
                // Simple symbols and text/numbers on markers: https://github.com/coryasilva/Leaflet.ExtraMarkers
                icon: L.ExtraMarkers.icon({
                    icon: 'fa-number',
                    number: feature.properties.id,
                    shape: 'square',
                    markerColor: 'yellow'
                }),
                interactive: false
            });

            if (!add_checkbox_for_marker(feature, marker, seagulls_tlad_list, "seagulls_tlad", seagulls_tlad_cluster)) {
                return null;
            }
            return marker;
        }
    }).addTo(seagulls_tlad_cluster);

    var overlayMaps = {
        "Flying Rats": pigeons_cluster,
        "Stunt Jumps": stunt_jump_cluster,
        "Under Bridges": under_bridges_group,
        "Seagulls - BoGT": seagulls_bogt_cluster,
        "Seagulls - TLaD": seagulls_tlad_cluster
    };

    // Make overlay layer visible by default
    map.addLayer(pigeons_cluster);
    map.addLayer(stunt_jump_cluster);
    map.addLayer(under_bridges_group);

    // Center view over map
    map.fitBounds(pigeons_cluster.getBounds());
}

// Add user selection to map
L.control.layers(baseMaps, overlayMaps).addTo(map);
