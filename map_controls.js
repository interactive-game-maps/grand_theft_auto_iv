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
map.fitBounds([[0, 0], [-120, 190]]);

// Add user selection to map
L.control.layers(baseMaps, overlayMaps).addTo(map);
