function onEachFeature(feature, layer) {

    var popupContent = '';

	if (feature.properties) {
        if (feature.properties.title) {
            popupContent = popupContent + feature.properties.title + '<br>';
        }
        if (feature.properties.level) {
            switch(feature.properties.level) {
                case 1: popupContent = popupContent + 'Классик <br>';
                case 2: popupContent = popupContent + 'Классик+ <br>';
                case 3: popupContent = popupContent + 'Бизнес <br>';
                case 4: popupContent = popupContent + 'Бизнес+ <br>';
            }
        }

        if (feature.properties.type) {
            popupContent = popupContent + 'Тип помощи: ' + feature.properties.type + '<br>';
        }

        if (feature.properties.address) {
            popupContent = popupContent + 'Адрес: ' +  feature.properties.address;
        }
        
        layer.bindPopup(popupContent);
    }
    
}

var map = L.map('map', {
}).setView([59.939095, 30.315868], 11)

var osmLayer = L.tileLayer.provider('OpenStreetMap').addTo(map)

var baseMaps = {
    OSM: osmLayer,
}


var alfa1Layer = L.geoJson(alfa1data, {
	onEachFeature: onEachFeature
});
var alfa2Layer = L.geoJson(alfa2data, {
	onEachFeature: onEachFeature
});
var alfa3Layer = L.geoJson(alfa3data, {
	onEachFeature: onEachFeature
});
var alfa4Layer = L.geoJson(alfa4data, {
	onEachFeature: onEachFeature
});

var alfa1Cluster = L.markerClusterGroup();
var alfa2Cluster = L.markerClusterGroup();
var alfa3Cluster = L.markerClusterGroup();
var alfa4Cluster = L.markerClusterGroup();

alfa1Cluster.addLayer(alfa1Layer);
alfa2Cluster.addLayer(alfa2Layer);
alfa3Cluster.addLayer(alfa3Layer);
alfa4Cluster.addLayer(alfa4Layer);

alfa1Cluster.addTo(map);
alfa2Cluster.addTo(map);
alfa3Cluster.addTo(map);
alfa4Cluster.addTo(map);

L.control.layers(baseMaps, {
    'Классик': alfa1Cluster,
    'Классик +': alfa2Cluster,
    'Бизнес': alfa3Cluster,
    'Бизнес +': alfa4Cluster,
}).addTo(map);

