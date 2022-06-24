var distance = require('google-distance-matrix');
var dotenv = require('dotenv');
dotenv.config();
var express = require('express');

function getDistancesFromOrigin(origin, destinations){
    console.log("I am accessible")
    return new Promise((resolve, reject) => {
        distance.key('AIzaSyAkbV8govh-Rv1ytH3fcewTF_c4hq1nYnw');
        distance.units('metric');
        distance.matrix(origin, destinations, function (err, distances) {
            console.log("I am inside distance.matrix")
            if (err) {
                console.log("Error in distance matrix",err)
                reject(err);
               
            }
            if (!distances) {
                console.log("!distances Here")
                reject('no distances');
            }
            if (distances.status == 'OK') {
                console.log("Till Now Everything is Okay")
                const routes = [];
                for (var i = 0; i < origin.length; i++) {
                    for (var j = 0; j < destinations.length; j++) {
                        const destination = distances.destination_addresses[j];
                        if (distances.rows[0].elements[j].status == 'OK') {
                            var distance =distances.rows[i].elements[j].distance.value;
                                distance=distance/1000;
                            routes.push({
                                origin: origin[i],
                                destination: destination,
                                distance: distance,
                            });
                        } else {
                            routes.push({
                                origin: origin[i],
                                destination: destination,
                                distance: 'not reachable',
                            });
                        }
                    }
                }
                console.log("Routes inside distancematrix",routes)
                resolve(routes);
            } else {
                reject(distances.status);
            }
        });
    });
    
};
module.exports = getDistancesFromOrigin;