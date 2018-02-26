var locationIsActive = false;
var locationInfos = {};
var map;
var check = [];
check[1] = true;
check[2] = true;
check[3] = true;
var markers = [];

/**
 * GOOGLE MAP FRANCE
 */
function initMap(longitude, latitude, zoom) {
    if (!locationIsActive) {
        longitude = 2.43896484375;
        latitude = 46.52863469527167;
        zoom = 6;
    }

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: zoom,
        center: new google.maps.LatLng(latitude, longitude),
        mapTypeId: 'terrain'
    });

    if (locationIsActive) {
        new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            map: map,
            animation: google.maps.Animation.DROP,
            title: 'Votre position',
            icon: {
                url: 'user.svg',
                size: new google.maps.Size(24, 24),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(0, 0)
            }
        });

        chargeRandomMarkers(latitude, longitude, 0.008, 0.005, 10, false);
    } else {
        // chargeRandomMarkers(latitude, longitude, 3, 3, 15);
        chargeRandomMarkers(latitude, longitude, 3, 3, 100, true);
    }

    var script = document.createElement('script');
    script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
    document.getElementsByTagName('head')[0].appendChild(script);
}

window.eqfeed_callback = function(results) {
    // for (var i = 0; i < results.features.length; i++) {
    //     var coords = results.features[i].geometry.coordinates;
    //     var latLng = new google.maps.LatLng(coords[1],coords[0]);
    //     new google.maps.Marker({
    //         position: latLng,
    //         map: map
    //     });
    // }
};

function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
}

function chargeRandomMarkers(latitude, longitude, deltaX, deltaY, qte, global) {
    for (var i = 0; i < qte; i++) {
        var optionsMarker = {
            position: new google.maps.LatLng(getRandomInRange(latitude-deltaX, latitude+deltaX, 9), getRandomInRange(longitude-deltaY, longitude+deltaY, 9)),
            map: map,
            animation: google.maps.Animation.DROP,
            infos: {
                titre: 'Panne n°' + (i+1),
                description: 'Lorem Ipsum........',
                NbSignalements: Math.round((Math.random()*300)+1),
                user: 'User n°' + Math.round((Math.random()*300)+1),
                status: Math.round((Math.random()*2)+1)
            },
            icon: {
                size: new google.maps.Size(24, 24),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(12, 24)
            }
        };

        if (global) {
            // for paris
            if (i % 7 === 1) {
                var tlongitude = 2.333333;
                var tlatitude = 48.866667;
                optionsMarker.position = new google.maps.LatLng(getRandomInRange(tlatitude - 0.08, tlatitude + 0.08, 9), getRandomInRange(tlongitude - 0.08, tlongitude + 0.08, 9));
            }

            // for bordeaux
            if (i % 7 === 2) {
                var tlongitude = -0.57918;
                var tlatitude = 44.837789;
                optionsMarker.position = new google.maps.LatLng(getRandomInRange(tlatitude - 0.08, tlatitude + 0.08, 9), getRandomInRange(tlongitude - 0.08, tlongitude + 0.08, 9));
            }

            // for lyon
            if (i % 7 === 3) {
                var tlongitude = 4.850000;
                var tlatitude = 45.750000;
                optionsMarker.position = new google.maps.LatLng(getRandomInRange(tlatitude - 0.08, tlatitude + 0.08, 9), getRandomInRange(tlongitude - 0.08, tlongitude + 0.08, 9));
            }

            // for lille
            if (i % 7 === 4) {
                var tlongitude = 3.066667;
                var tlatitude = 50.633333;
                optionsMarker.position = new google.maps.LatLng(getRandomInRange(tlatitude - 0.08, tlatitude + 0.08, 9), getRandomInRange(tlongitude - 0.08, tlongitude + 0.08, 9));
            }

            // for paca
            if (i % 7 === 5) {
                var tlongitude = 6.9167;
                var tlatitude = 43.6667;
                optionsMarker.position = new google.maps.LatLng(getRandomInRange(tlatitude - 0.08, tlatitude + 0.08, 9), getRandomInRange(tlongitude - 0.08, tlongitude + 0.08, 9));
            }

            // for bretagne
            if (i % 7 === 6) {
                var tlongitude = -1.6742900;
                var tlatitude = 48.1119800;
                optionsMarker.position = new google.maps.LatLng(getRandomInRange(tlatitude - 0.08, tlatitude + 0.08, 9), getRandomInRange(tlongitude - 0.08, tlongitude + 0.08, 9));
            }
        }

        optionsMarker.icon.url = 'panne' + optionsMarker.infos.status + '.svg';

        var marker = new google.maps.Marker(optionsMarker);
        markers.push(marker);

        google.maps.event.addListener(marker, 'mouseover', function() {
            $('.bloc-infos').css('display', 'block');
            $('.bloc-infos .card-title').html(this.infos.titre);
            $('.bloc-infos .signale-par').html(this.infos.user);
            $('.bloc-infos .signale-nb').html(this.infos.NbSignalements);
            if (this.infos.status === 1) {
                $('.bloc-infos .status-color').css('background', 'red');
                $('.bloc-infos .status').html('Non résolu');
            } else if (this.infos.status === 2) {
                $('.bloc-infos .status-color').css('background', 'orange');
                $('.bloc-infos .status').html('En cours de résolution');
            } else if (this.infos.status === 3) {
                $('.bloc-infos .status-color').css('background', 'green');
                $('.bloc-infos .status').html('Résolu');
            }
            $('.bloc-infos .description').html("Problème de réseau mobile chez tous les opérateurs. Suite aux intempéries l'antenne est endommagée.");
        });
        google.maps.event.addListener(marker, 'mouseout', function() {
            $('.bloc-infos').css('display', 'none');
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
        $('.loader').css('display', 'block');
        navigator.geolocation.getCurrentPosition(function (position) {
            locationInfos = position;
            initMap(locationInfos.coords.longitude, locationInfos.coords.latitude, 15);
            $('.loader').css('display', 'none');
            $('.notifications-bloc').css('display', 'block');
            $('.incident-bloc').css('display', 'block');
            $('.bloc-parametres').css('top', '380px');
        });
    } else {
        initMap();
        $('.notifications-bloc').css('display', 'none');
        $('.incident-bloc').css('display', 'none');
        $('.bloc-parametres').css('top', '335px');
    }
}

/**
 * NOTIFICATIONS
 */
function getNotifications(value) {
    console.log('Active Notifications');
    Push.config({
        serviceWorker: './bower_components/push.js/bin/serviceWorker.min.js'
    });

    if (value.checked) {
        Push.create("Incidents mobiles", {
            body: "Vous serez maintenant avertis des incidents de réseau mobile proche de vous !",
            icon: 'user.svg',
            timeout: 5000,
            onClick: function () {
                window.focus();
                this.close();
            }
        });

        setTimeout(function() {
            Push.create("Incident signalé !", {
                body: "Un incident a été signalé proche de vous.",
                icon: 'user.svg',
                timeout: 15000,
                onClick: function () {
                    window.focus();
                    this.close();
                }
            });
        }, 5000);
    } else {
        Push.create("Incidents mobiles", {
            body: "Les notifications sont maintenant désactivées !",
            icon: 'user.svg',
            timeout: 5000,
            onClick: function () {
                window.focus();
                this.close();
            }
        });
    }
}

function checkChange() {
    check[1] = document.querySelector('#check-1').checked;
    check[2] = document.querySelector('#check-2').checked;
    check[3] = document.querySelector('#check-3').checked;

    if (check[1]) {
        document.querySelector('.afficher1').style.display = 'none';
        document.querySelector('.cacher1').style.display = 'block';
    } else {
        document.querySelector('.afficher1').style.display = 'block';
        document.querySelector('.cacher1').style.display = 'none';
    }

    if (check[2]) {
        document.querySelector('.afficher2').style.display = 'none';
        document.querySelector('.cacher2').style.display = 'block';
    } else {
        document.querySelector('.afficher2').style.display = 'block';
        document.querySelector('.cacher2').style.display = 'none';
    }

    if (check[3]) {
        document.querySelector('.afficher3').style.display = 'none';
        document.querySelector('.cacher3').style.display = 'block';
    } else {
        document.querySelector('.afficher3').style.display = 'block';
        document.querySelector('.cacher3').style.display = 'none';
    }

    for (var i = 0; i < markers.length; i++) {
        if (check[markers[i].infos.status]) {
            markers[i].setMap(map);
        } else {
            markers[i].setMap(null);
        }
    }
}