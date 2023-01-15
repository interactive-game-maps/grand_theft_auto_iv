function getPopupMedia(feature, list_id) {
    var html = document.createElement('div');

    const POPUP_WIDTH_16_9 = Math.min(500, window.screen.availWidth - 100, (window.screen.availHeight - 200) * 16 / 9);
    const POPUP_WIDTH_4_3 = Math.min(500, window.screen.availWidth - 100, (window.screen.availHeight - 200) * 4 / 3);

    if (feature.properties.image_id) {
        var prefix = '';
        var suffix = '.jpg';
        switch (list_id) {
            case 'pigeons':
                prefix = 'https://media.gtanet.com/gta4/images/flying-rats/';
                break;
            case 'car_thefts':
                prefix = 'https://media.gtanet.com/gta4/images/car-thefts/';
                break;
            case 'strangers':
                prefix = 'http://media.gtanet.com/gta4/images/random-characters/';
                break;
            case 'window_cleaning_platforms':
                prefix = 'https://media.gtanet.com/images/';
                suffix = '-gta-iv-window-cleaning-platform.jpg';
                break;
            case 'seagulls_bogt':
                prefix = 'https://media.gtanet.com/gta4/images/seagulls-bogt/';
                break;
            case 'seagulls_tlad':
                prefix = 'https://media.gtanet.com/gta4/images/seagulls/';
                break;

            default:
                break;
        }
        var image_link = document.createElement('a');
        image_link.href = prefix + feature.properties.image_id + suffix;

        var image = document.createElement('img');
        image.className = 'popup-media';
        image.src = prefix + feature.properties.image_id + suffix;

        image_link.appendChild(image);
        html.appendChild(image_link);
    } else if (feature.properties.video_id) {
        var video = document.createElement('iframe');
        video.className = 'popup-media';
        video.width = POPUP_WIDTH_16_9;
        video.height = POPUP_WIDTH_16_9 / 16 * 9;
        video.src = `https://www.youtube-nocookie.com/embed/${feature.properties.video_id}&mute=1`;
        video.title = 'YouTube video player';
        video.frameborder = 0;
        // video.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; allowfullscreen'

        html.appendChild(video);
    }

    return html;
}

/**
 * Convert ingame coordinates into L.LatLng
 * @param {Array} coords Array of coordinates [x, y(, z)]
 * @returns L.LatLng
 */
function gtaCoordinatesToLeaflet(coords) {
    var lx = (coords[0] + 2571) * 0.0321;
    var ly = (coords[1] - 2441) * 0.03187;
    return L.latLng(ly, lx);
}
