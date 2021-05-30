var overlayMaps = {
    "Flying Rats": pigeons_group,
    "Stunt Jumps": stunt_jumps_group,
    "Under Bridges": under_bridges_group,
    "Seagulls - BoGT": seagulls_bogt_group,
    "Seagulls - TLaD": seagulls_tlad_group
};

// Make overlay layer visible by default
map.addLayer(pigeons_group);
map.addLayer(stunt_jumps_group);
map.addLayer(under_bridges_group);

// Center view over map
map.fitBounds([[0, 0], [-120, 190]]);

// Add user selection to map
L.control.layers(baseMaps, overlayMaps).addTo(map);

// Search in url for marker and locate them
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if (urlParams.has('list')) {
    const list = urlParams.get('list');
    if (marker.get(list).has('group')) {
        // make group visible
        map.addLayer(marker.get(list).get('group'));
    }
    if (!urlParams.has('id')) {
        // if no id open sidebar
        sidebar.open(list);
    }
    else {
        const id = urlParams.get('id');
        if (marker.has(list) && marker.get(list).has(id)) {
            // center and zoom id
            map.fitBounds(L.latLngBounds([marker.get(list).get(id)[0].getLatLng()]));
        }
    }
}

// hide all previously checked marker
// iterate over all lists
marker.forEach((v, k) => {
    // iterate over all IDs
    v.forEach((value, key) => {
        if (key == "group") return;

        // iterate over all features with that ID
        value.forEach(item => {
            // Remove if checked
            if (localStorage.getItem(k + ":" + key)) {
                v.get("group").removeLayer(item);
            }
        });
    });
});
