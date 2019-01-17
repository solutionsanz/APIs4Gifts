var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var config = require("../../config");
var http = require('http');
var https = require('https');

var funct = require('./functions');

//CRI change:
var bodyParser = require('body-parser');

// Configure application routes
module.exports = function (app) {

    // CRI change to allow JSON parsing from requests:    
    app.use(bodyParser.json()); // Support for json encoded bodies 
    app.use(bodyParser.urlencoded({
        extended: true
    })); // Support for encoded bodies

    function log(apiMethod, apiUri, msg) {
        console.log("[" + apiMethod + "], [" + apiUri + "], [" + msg + "], [UTC:" +
            new Date().toISOString().replace(/\..+/, '') + "]");
    }

    /**
     * Adding APIs:
     * 
     */

    /* GET /games */
    app.get('/games', function (req, res) {


        var query = `SELECT * FROM GAMES`;
        var params = [];

        log("GET", "/games", "Query to execute [" + query + "]");


        funct.getDataGeneric(query, params, function (resMetadata, resData) {

            log("GET", "/games", "Found: [" + JSON.stringify({
                resData
            }) + "]");

            // In order to comply with the API documentation, 
            // let's validate if an Array was return, in which
            // case we simply return it.
            // Otherwise we will create an array of 1 element
            // in the response.
            var arrResult = [];
            var renderedResult = {};
            if (resMetadata != null && resMetadata != undefined && resData != null && resData != undefined) {

                for (var x in resData) {

                    // Starting new order:
                    renderedResult = {};
                    for (var y in resData[x]) {


                        col = resMetadata[y].name.toLowerCase();
                        colValue = resData[x][y];
                        renderedResult[col] = colValue;

                        console.log("col is [" + col + "], colValue is [" + colValue + "]");
                    }
                    // Adding full record to array:
                    console.log("record is [" + JSON.stringify(renderedResult) + ']');
                    arrResult.push(renderedResult);
                }

            }

            // Returning result
            res.send({
                "game": arrResult
            });
        });
    });


    /* GET /games/:gid */
    app.get('/games/:gid', function (req, res) {

        var gid = req.params.gid; //gid to filter by (if given)

        var query = `SELECT * FROM GAMES WHERE GAME_ID = :id`;
        var params = [];

        if (gid != null && gid != undefined) {

            params = [gid];

        } else {
            res.status(400).end("gid parameter empty or invalid. Verify parameters and try again."); //Bad request...
            return;
        }

        log("GET", "/games", "gid received [" + gid + "]");


        funct.getDataGeneric(query, params, function (resMetadata, resData) {

            log("GET", "/games", "Found: [" + JSON.stringify({
                resData
            }) + "]");

            // In order to comply with the API documentation, 
            // let's validate if an Array was return, in which
            // case we simply return it.
            // Otherwise we will create an array of 1 element
            // in the response.
            // var result = [];
            var renderedResult = {};
            if (resMetadata != null && resMetadata != undefined && resData != null && resData != undefined) {

                for (var x in resData) {

                    // Starting new order:
                    renderedResult = {};
                    for (var y in resData[x]) {


                        col = resMetadata[y].name.toLowerCase();
                        colValue = resData[x][y];
                        renderedResult[col] = colValue;

                        console.log("col is [" + col + "], colValue is [" + colValue + "]");
                    }
                    // Adding full record to array:
                    console.log("record is [" + JSON.stringify(renderedResult) + ']');
                    // result.push(renderedResult);
                }

            }

            // Returning result
            res.send({
                "game": renderedResult
            });
        });
    });



    /* GET GAME_OBJECT /gos */
    app.get('/gos', function (req, res) {


        var query = `SELECT * FROM GAME_OBJECTS`;
        var params = [];

        log("GET", "/gos", "Query to execute [" + query + "]");


        funct.getDataGeneric(query, params, function (resMetadata, resData) {

            log("GET", "/gos", "Found: [" + JSON.stringify({
                resData
            }) + "]");

            // In order to comply with the API documentation, 
            // let's validate if an Array was return, in which
            // case we simply return it.
            // Otherwise we will create an array of 1 element
            // in the response.
            var arrResult = [];
            var renderedResult = {};
            if (resMetadata != null && resMetadata != undefined && resData != null && resData != undefined) {

                for (var x in resData) {

                    // Starting new order:
                    renderedResult = {};
                    for (var y in resData[x]) {


                        col = resMetadata[y].name.toLowerCase();
                        colValue = resData[x][y];
                        renderedResult[col] = colValue;

                        console.log("col is [" + col + "], colValue is [" + colValue + "]");
                    }
                    // Adding full record to array:
                    console.log("record is [" + JSON.stringify(renderedResult) + ']');
                    arrResult.push(renderedResult);
                }

            }

            // Returning result
            res.send({
                "gameObjects": arrResult
            });
        });
    });


    /* GET GAME_OBJECTS /gos/:goid */
    app.get('/gos/:goid', function (req, res) {

        var goid = req.params.goid; //gid to filter by (if given)

        var query = `SELECT * FROM GAME_OBJECTS WHERE GAME_OBJECT_ID = :id`;
        var params = [];

        if (goid != null && goid != undefined) {

            params = [goid];

        } else {
            res.status(400).end("goid parameter empty or invalid. Verify parameters and try again."); //Bad request...
            return;
        }

        log("GET", "/gos/:goid", "gid received [" + goid + "]");


        funct.getDataGeneric(query, params, function (resMetadata, resData) {

            log("GET", "/gos/:goid", "Found: [" + JSON.stringify({
                resData
            }) + "]");

            // In order to comply with the API documentation, 
            // let's validate if an Array was return, in which
            // case we simply return it.
            // Otherwise we will create an array of 1 element
            // in the response.
            // var result = [];
            var renderedResult = {};
            if (resMetadata != null && resMetadata != undefined && resData != null && resData != undefined) {

                for (var x in resData) {

                    // Starting new order:
                    renderedResult = {};
                    for (var y in resData[x]) {


                        col = resMetadata[y].name.toLowerCase();
                        colValue = resData[x][y];
                        renderedResult[col] = colValue;

                        console.log("col is [" + col + "], colValue is [" + colValue + "]");
                    }
                    // Adding full record to array:
                    console.log("record is [" + JSON.stringify(renderedResult) + ']');
                    // result.push(renderedResult);
                }

            }

            // Returning result
            res.send({
                "gameObject": renderedResult
            });
        });
    });


    /* GET GAME_PLAYER /players */
    app.get('/players', function (req, res) {


        var query = `SELECT * FROM GAME_PLAYERS`;
        var params = [];

        log("GET", "/players", "Query to execute [" + query + "]");


        funct.getDataGeneric(query, params, function (resMetadata, resData) {

            log("GET", "/players", "Found: [" + JSON.stringify({
                resData
            }) + "]");

            // In order to comply with the API documentation, 
            // let's validate if an Array was return, in which
            // case we simply return it.
            // Otherwise we will create an array of 1 element
            // in the response.
            var arrResult = [];
            var renderedResult = {};
            if (resMetadata != null && resMetadata != undefined && resData != null && resData != undefined) {

                for (var x in resData) {

                    // Starting new order:
                    renderedResult = {};
                    for (var y in resData[x]) {


                        col = resMetadata[y].name.toLowerCase();
                        colValue = resData[x][y];
                        renderedResult[col] = colValue;

                        console.log("col is [" + col + "], colValue is [" + colValue + "]");
                    }
                    // Adding full record to array:
                    console.log("record is [" + JSON.stringify(renderedResult) + ']');
                    arrResult.push(renderedResult);
                }

            }

            // Returning result
            res.send({
                "players": arrResult
            });
        });
    });


    /* GET GAME_PLAYERS /players/:gpid */
    app.get('/players/:gpid', function (req, res) {

        var gpid = req.params.gpid; //gid to filter by (if given)

        var query = `SELECT * FROM GAME_PLAYERS WHERE PLAYER_ID = :id`;
        var params = [];

        if (gpid != null && gpid != undefined) {

            params = [gpid];

        } else {
            res.status(400).end("gpid parameter empty or invalid. Verify parameters and try again."); //Bad request...
            return;
        }

        log("GET", "/players/:gpid", "gpid received [" + gpid + "]");


        funct.getDataGeneric(query, params, function (resMetadata, resData) {

            log("GET", "/players/:gpid", "Found: [" + JSON.stringify({
                resData
            }) + "]");

            // In order to comply with the API documentation, 
            // let's validate if an Array was return, in which
            // case we simply return it.
            // Otherwise we will create an array of 1 element
            // in the response.
            // var result = [];
            var renderedResult = {};
            if (resMetadata != null && resMetadata != undefined && resData != null && resData != undefined) {

                for (var x in resData) {

                    // Starting new order:
                    renderedResult = {};
                    for (var y in resData[x]) {


                        col = resMetadata[y].name.toLowerCase();
                        colValue = resData[x][y];
                        renderedResult[col] = colValue;

                        console.log("col is [" + col + "], colValue is [" + colValue + "]");
                    }
                    // Adding full record to array:
                    console.log("record is [" + JSON.stringify(renderedResult) + ']');
                    // result.push(renderedResult);
                }

            }

            // Returning result
            res.send({
                "player": renderedResult
            });
        });
    });



    /* GET GAME_PLAYER_INTERACTIONS /gpis */
    app.get('/gpis', function (req, res) {


        var query = `SELECT * FROM GAME_PLAYER_INTERACTIONS`;
        var params = [];

        log("GET", "/gpis", "Query to execute [" + query + "]");


        funct.getDataGeneric(query, params, function (resMetadata, resData) {

            log("GET", "/gpis", "Found: [" + JSON.stringify({
                resData
            }) + "]");

            // In order to comply with the API documentation, 
            // let's validate if an Array was return, in which
            // case we simply return it.
            // Otherwise we will create an array of 1 element
            // in the response.
            var arrResult = [];
            var renderedResult = {};
            if (resMetadata != null && resMetadata != undefined && resData != null && resData != undefined) {

                for (var x in resData) {

                    // Starting new order:
                    renderedResult = {};
                    for (var y in resData[x]) {


                        col = resMetadata[y].name.toLowerCase();
                        colValue = resData[x][y];
                        renderedResult[col] = colValue;

                        console.log("col is [" + col + "], colValue is [" + colValue + "]");
                    }
                    // Adding full record to array:
                    console.log("record is [" + JSON.stringify(renderedResult) + ']');
                    arrResult.push(renderedResult);
                }

            }

            // Returning result
            res.send({
                "GamePlayerInteractions": arrResult
            });
        });
    });


    /* POST /gpis */
    app.post('/gpis', function (req, res) {

        // // Retrieve Records to be inserted from Body:
        var gpis = req.body.GamePlayerInteractions;

        if (gpis == null || gpis == undefined) {
            log("POST", "/gpis", "No data received... Please verify and try again.");
            res.status(400).end("No data received... Please verify and try again."); //Bad request...
            return;
        }

        var strQuery = " INTO GAME_PLAYER_INTERACTIONS (GAME_OBJECT_ID,PLAYER_ID,GPI_LAT,GPI_LONG, GPI_DATE, GPI_RESULT)";
        strQuery += " VALUES (:GAME_OBJECT_ID, :PLAYER_ID, :GPI_LAT, :GPI_LONG, sysdate, :GPI_RESULT) ";

        var query = "INSERT ALL";
        var params = [];

        for (var x in gpis) {

            query = query + strQuery;

            query = query.replace(/:GAME_OBJECT_ID/g, +gpis[x].goid);
            query = query.replace(/:PLAYER_ID/g, gpis[x].gpid);
            query = query.replace(/:GPI_LAT/g, gpis[x].gpiLat);
            query = query.replace(/:GPI_LONG/g, gpis[x].gpiLong);
            // query = query.replace(/:GPI_DATE/g, "'" + gpis[x].gpiDate + "'");
            query = query.replace(/:GPI_RESULT/g, "'" + gpis[x].gpiResult + "'");
        }

        query += "SELECT * FROM DUAL";


        console.log("Items/Rows to be inserted into DB [" + gpis.length + "]");

        funct.insertDataGeneric(query, params, function () {

            // Echoing result... node-oradb does not return the id, so let's temporarily return the incoming list of orders
            res.send({
                "GamePlayerInteractions": gpis
            });
        });
    });


    /* PUT /gpis */
    app.put('/gpis/:gpisId', function (req, res) {


        // Retrieving Records to be inserted from path and Body:
        var gpisId = req.params.gpisId;
        var gpis = req.body.GamePlayerInteraction;

        if (gpis == null || gpis == undefined || gpisId == null || gpisId == undefined) {
            log("PUT", "/gpis/:gpisId", "gpis_id or no payload data received... Please verify and try again.");
            res.status(400).end("gpis_id or no payload data received... Please verify and try again."); //Bad request...
            return;
        }

        // Setting variables:
        var GPI_ID = gpisId;
        var GAME_OBJECT_ID = gpis.goid;
        var PLAYER_ID = gpis.gpid;
        var GPI_LAT = gpis.gpiLat;
        var GPI_LONG = gpis.gpiLong;
        var GPI_RESULT = gpis.gpiResult;

        var query = "UPDATE GAME_PLAYER_INTERACTIONS SET GAME_OBJECT_ID = :GAME_OBJECT_ID, PLAYER_ID = :PLAYER_ID, GPI_LAT = :GPI_LAT, GPI_LONG = :GPI_LONG, GPI_RESULT = :GPI_RESULT WHERE GPI_ID = :GPI_ID";

        var params = [GAME_OBJECT_ID, PLAYER_ID, GPI_LAT, GPI_LONG, GPI_RESULT, GPI_ID];

        log("PUT", "/gpis/:gpisId", "Params are [" + JSON.stringify(params) + "]");


        funct.insertDataGeneric(query, params, function () {

            // Echoing result... node-oradb does not return the id, so let's temporarily return the incoming list of orders
            res.send({
                "GamePlayerInteraction": gpis
            });
        });
    });

};