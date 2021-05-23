{ // Helper functions
    function add_checkbox_for_marker(feature, marker, list, list_name, cluster) {
        // Add checkbox for marker
        var list_entry = document.createElement('li');

        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.id = list_name + ':' + feature.properties.id;

        var label = document.createElement('label')
        label.appendChild(document.createTextNode(feature.properties.id + ' '));
        label.htmlFor = checkbox.id;

        var icon = document.createElement('i');
        icon.className = 'fas fa-crosshairs';

        var locate_button = document.createElement('button');
        locate_button.innerHTML = icon.outerHTML;
        locate_button.addEventListener('click', () => {
            map.setView(marker.getLatLng());
        });

        list_entry.appendChild(checkbox);
        list_entry.appendChild(label);
        list_entry.appendChild(locate_button);
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
