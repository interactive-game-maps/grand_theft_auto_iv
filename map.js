var interactive_map = new InteractiveMap('map', {
    max_good_zoom: 5,
    max_map_zoom: 8,
    website_source: 'https://github.com/interactive-game-maps/grand_theft_auto_iv',
    website_subdir: 'grand_theft_auto_iv',
    attribution: `
    <li><div>Images from <a href="https://www.gta4.net/100-percent-completion-checklist/">GTA4.net</a>.</div></li>
    `
});

interactive_map.addTileLayer('Ingame map', {
    minNativeZoom: 2,
    maxNativeZoom: 5,
    attribution: 'Map from <a href="https://www.gtavision.com/index.php?section=content&site=116">GTAvision.com</a>'
});

interactive_map.addTileLayer('Vector map', {
    minNativeZoom: 2,
    maxNativeZoom: 5,
    attribution: 'Map from <a href="https://www.mapsland.com/maps/games/large-detailed-map-of-liberty-city-gta-4.jpg">Mapsland</a>'
}, 'vector_tiles/{z}/{x}/{y}.png');

addPigeons(interactive_map);
addStuntJumps(interactive_map);
addUnderBridges(interactive_map);
addCarThefts(interactive_map);
addStrangers(interactive_map);
addSeagullsBogt(interactive_map);
addSeagullsTlad(interactive_map);
addWindowCleaningPlatforms(interactive_map);

interactive_map.finalize();
