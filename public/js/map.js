
var theme = 'https://{s}.tile.osm.org/{z}/{x}/{y}.png';
var lat = 8.619543;
var lon = 0.82;
var alt =481;
var macarte = null;
var i = 0;
var markerClusters;
var popup = L.popup();


function initMapCb()
{
    initMap();
}

function initMap(){

    macarte = L.map('map').setView([48.833, 2.333], 4); 
    markerClusters = L.markerClusterGroup; 
    L.tileLayer(theme, {
        minZoom: 1,
        maxZoom: 20
    }).addTo(macarte);

    savedDatabase.forEach(bottle => {
        if(bottle.zip != "")
        { 
            var coords = bottle.zip.replace(' ','',);
            var val = getLnt(coords);
            L.marker([48.5, -0.09]).addTo(macarte).bindPopup('<b>'+bottle.name+'</b><br>'+bottle.distillerie+'<br>'+val);
        }
    });

    macarte.on('click', onMapClick);
}


function onMapClick(e) {
popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(macarte);
    var marker = L.marker(e.latlng).addTo(macarte)
}


function getLnt(zip){
    var url = "http://maps.googleapis.com/maps/api/geocode/json?address=" + zip + "&sensor=false";


    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState === 4 && xhr.status === 200)
        {
            let jsonBottle = JSON.parse(xhr.response);
            
        }
    }
    xhr.send();

  }