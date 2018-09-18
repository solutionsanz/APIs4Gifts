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

    /* GET /gifts/gps */
    app.get('/gifts/gps', function (req, res) {

        var orderId = req.query.gpsGiftId; //gpsGiftId to filter by (if given)

        log("GET", "/gifts/gps", "gpsGiftId received [" + orderId + "]");

        funct.getGiftGps(orderId, function (resMetadata, resData) {

            log("GET", "/gifts/gps", "Found: [" + JSON.stringify({
                resData
            }) + "]");

            // In order to comply with the API documentation, 
            // let's validate if an Array was return, in which
            // case we simply return it.
            // Otherwise we will create an array of 1 element
            // in the response.
            var result = [];
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
                    // Adding full order to array:
                    console.log("order is [" + JSON.stringify(renderedResult) + ']');
                    result.push(renderedResult);
                }

            }

            // Returning result
            res.send({
                "GPSGifts": result
            });
        });
    });

    /* POST /gifts/gps */
    app.post('/gifts/gps', function (req, res) {

        // // Retrieve Records to be inserted from Body:
        var gpsGifts = req.body.GPSGifts;

        if (gpsGifts == null || gpsGifts == undefined) {
            log("POST", "/gifts/gps", "No data received... Please verify and try again.");
            res.status(400).end("No data received... Please verify and try again."); //Bad request...
            return;
        }


        funct.insertGpsGifts(gpsGifts, function () {

            // Echoing result... node-oradb does not return the id, so let's temporarily return the incoming list of orders
            res.send({
                "GPSGifts": gpsGifts
            });
        });
    });



    /* GET /gifts/gps/redeem */
    app.get('/gifts/gps/redeem', function (req, res) {

        var orderId = req.query.gpsGiftId; //gpsGiftId to filter by (if given)

        log("GET", "/gifts/gps/redeem", "gpsGiftId received [" + orderId + "]");

        funct.getGiftGpsRedeem(orderId, function (resMetadata, resData) {

            log("GET", "/gifts/gps/redeem", "Found: [" + JSON.stringify({
                resData
            }) + "]");

            // In order to comply with the API documentation, 
            // let's validate if an Array was return, in which
            // case we simply return it.
            // Otherwise we will create an array of 1 element
            // in the response.
            var result = [];
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
                    // Adding full order to array:
                    console.log("order is [" + JSON.stringify(renderedResult) + ']');
                    result.push(renderedResult);
                }

            }

            // Returning result
            res.send({
                "RedemptionGPSGifts": result
            });
        });
    });

    /* POST /gifts/gps/redeem */
    app.post('/gifts/gps/redeem', function (req, res) {

        // // Retrieve Records to be inserted from Body:
        var orders = req.body.RedemptionGPSGifts;

        if (orders == null || orders == undefined) {
            log("POST", "/gifts/gps/redeem", "No data received... Please verify and try again.");
            res.status(400).end("No data received... Please verify and try again."); //Bad request...
            return;
        }


        funct.insertGpsGiftsRedeem(orders, function () {

            // Echoing result... node-oradb does not return the id, so let's temporarily return the incoming list of orders
            res.send({
                "RedemptionGPSGifts": orders
            });
        });
    });


    /* GET /gifts/redeem */
    app.get('/gifts/redeem', function (req, res) {

        var orderId = req.query.giftId; //giftId to filter by (if given)

        log("GET", "/gifts/redeem", "giftId received [" + orderId + "]");

        funct.getGiftsRedeem(orderId, function (resMetadata, resData) {

            log("GET", "/gifts/redeem", "Found: [" + JSON.stringify({
                resData
            }) + "]");

            // In order to comply with the API documentation, 
            // let's validate if an Array was return, in which
            // case we simply return it.
            // Otherwise we will create an array of 1 element
            // in the response.
            var result = [];
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
                    // Adding full order to array:
                    console.log("order is [" + JSON.stringify(renderedResult) + ']');
                    result.push(renderedResult);
                }

            }

            // Returning result
            res.send({
                "RedemptionGifts": result
            });
        });
    });

    /* POST /gifts/redeem */
    app.post('/gifts/redeem', function (req, res) {

        // // Retrieve Records to be inserted from Body:
        var orders = req.body.RedemptionGifts;

        if (orders == null || orders == undefined) {
            log("POST", "/gifts/gps/redeem", "No data received... Please verify and try again.");
            res.status(400).end("No data received... Please verify and try again."); //Bad request...
            return;
        }


        funct.insertGiftsRedeem(orders, function () {

            // Echoing result... node-oradb does not return the id, so let's temporarily return the incoming list of orders
            res.send({
                "RedemptionGifts": orders
            });
        });
    });

    /* PUT Order status */
    // app.put('/orders/:id/status', function (req, res) {

    // var token = req.get("token");

    // console.log("Token received is [" + token + "]");

    // if (token == null || token == undefined || token != "valid") {

    //     log("PUT", "/orders/:id/status", "Invalid Token. Verify and try again.");
    //     res.status(400).end("Invalid Token. Verify and try again."); //Bad request...
    //     return;
    // }

    // // Retrieve Order Id and Status from Path and Body respectively:     
    // var orderId = req.params.id;
    // var orderStatus = req.body.Order.Status;


    // console.log("order Id [" + orderId + "], order status is [" + orderStatus + "]");

    // if (orderId == null || orderId == undefined || orderStatus == null ||
    //     orderStatus == undefined) {

    //     log("PUT", "/orders/:id/status", "Invalid or empty order Id or status. Verify and try again.");
    //     res.status(400).end("Invalid or empty order Id or status. Verify and try again."); //Bad request...
    //     return;
    // }

    // var DB_COLLECTION_NAME = "orders";

    // // Set our internal DB variable
    // var db = req.db;

    // // Set collection
    // log("PUT", "/orders/:id/status", "DB_COLLECTION_NAME [" + DB_COLLECTION_NAME + "]");
    // var collection = db.get(DB_COLLECTION_NAME);

    // // Adding ClosingDate and Time in ISO format: "yyyy-MM-ddTHH:mm:ss"
    // var closingDateTime = new Date().toISOString().replace(/\..+/, '');


    // log("PUT", "/orders/:id/status", "Updating Order [" + orderId + "], with status [" + orderStatus + "] at [" + closingDateTime + "]");

    // // Insert row to MongoDB
    // collection.update({
    //     "_id": orderId
    // }, {
    //     $set: {
    //         "Status": orderStatus,
    //         "ClosingDate": closingDateTime
    //     }
    // }, function (err, docs) {
    //     if (err) {
    //         log("PUT", "/orders/:id/status", "Oops, something wrong just happened.");
    //         res.send({
    //             Message: 'Oops, something wrong just happened. Please veify log files to determine cause.'
    //         });
    //     } else {

    //         // It all worked! Let's return successful answer.
    //         log("PUT", "/orders/:id/status", "Order status was updates successfully...");

    //         // Returning result
    //         res.send({
    //             "_id": orderId
    //         });

    //     }
    // });
    // });

};