var locationIsActive = false;
var locationInfos = {};
var map;
var zoom;

/**
 * GOOGLE MAP FRANCE
 */
function initMap(longitude, latitude, zoom) {
    if (!locationIsActive) {
        longitude = 2.00;
        latitude = 46.00;
        zoom = 6;
    }
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoom,
        center: new google.maps.LatLng(latitude, longitude),
        mapTypeId: 'terrain'
    });

    if (locationIsActive) {
        var image = {
            url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
            size: new google.maps.Size(40, 64),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(0, 32)
        };
        var latLng = new google.maps.LatLng(latitude, longitude);
        new google.maps.Marker({
            position: latLng,
            map: map,
            animation: google.maps.Animation.DROP,
            icon: image
        });
    }

    var script = document.createElement('script');
    script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
    document.getElementsByTagName('head')[0].appendChild(script);
}

window.eqfeed_callback = function(results) {
    for (var i = 0; i < results.features.length; i++) {
        var coords = results.features[i].geometry.coordinates;
        var latLng = new google.maps.LatLng(coords[1],coords[0]);
        var marker = new google.maps.Marker({
            position: latLng,
            map: map
        });
    }
}

/**
 * LOCALISATION
 */
function getLocation(value) {
    console.log('Active Localisation');
    locationIsActive = value.checked;
    if (navigator.geolocation && locationIsActive) {    
        $('#map').html('<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>');
        navigator.geolocation.getCurrentPosition(function (position) {
            locationInfos = position;
            initMap(locationInfos.coords.longitude, locationInfos.coords.latitude, 14);
            console.log(locationInfos);
        });
    }
}

/**
 * NOTIFICATIONS
 */
function getNotifications(value) {
    console.log('Active Notifications');
}