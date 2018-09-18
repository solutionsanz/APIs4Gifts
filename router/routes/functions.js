var config = require("../../config");
var http = require('http');
var https = require('https');
const translate = require('google-translate-api');

var gmailSender = require('gmail-sender-oauth');

// node-oradb package...
var oracledb = require('oracledb');
var dbConfig = require('../../dbconfig.js');

var connectionPool = [];
var connections = 5;

exports.getGiftGps = function (id, callback) {

	var query;
	var params;
	if (id != null && id != undefined) {
		query = `SELECT ID, GPSGiftID, Latitude, Longtitude, Altitude, ImageURL, RedemptionAction
		FROM GPS_Gifts
		WHERE ID = :id`;

		params = [id];

	} else {
		query = `SELECT ID, GPSGiftID, Latitude, Longtitude, Altitude, ImageURL, RedemptionAction
		FROM GPS_Gifts`;

		params = [];
	}

	console.log("Inside getGpsGiftId, before establishing connection. Query is [" + query + "], id is [" + id + "]");

	getData(query, params, callback);
};

exports.insertGpsGifts = function (gpsGifts, callback) {


	var strQuery = " INTO GPS_Gifts (GPSGiftID, Latitude, Longtitude, Altitude, ImageURL, RedemptionAction)";
	strQuery += " VALUES (:GPSGiftID, :Latitude, :Longtitude, :Altitude, :ImageURL, :RedemptionAction) ";

	var query = "INSERT ALL";
	var params = [];

	for (var x in gpsGifts) {

		query = query + strQuery;

		query = query.replace(/:GPSGiftID/g, "'" + gpsGifts[x].gpsgiftid + "'");
		query = query.replace(/:Latitude/g, "'" + gpsGifts[x].latitude + "'");
		query = query.replace(/:Longtitude/g, "'" + gpsGifts[x].longtitude + "'");
		query = query.replace(/:Altitude/g, "'" + gpsGifts[x].altitude + "'");
		query = query.replace(/:ImageURL/g, "'" + gpsGifts[x].imageurl + "'");
		query = query.replace(/:RedemptionAction/g, "'" + gpsGifts[x].redemptionaction + "'");
	}

	query += "SELECT * FROM DUAL";

	console.log("GPSGifts length is [" + gpsGifts.length + "]");
	console.log("concatenated query to execute is [" + query + "]");

	insertData(query, params, callback);
};

exports.getGiftGpsRedeem = function (id, callback) {

	var query;
	var params;
	if (id != null && id != undefined) {
		query = `SELECT ID, DeviceID, GPSGiftID, DateTime, RedeemedStatus
		FROM Redemption_GPS_Gifts
		WHERE ID = :id`;

		params = [id];

	} else {
		query = `SELECT ID, DeviceID, GPSGiftID, DateTime, RedeemedStatus
		FROM Redemption_GPS_Gifts`;

		params = [];
	}

	console.log("Inside getGiftGpsRedeem, before establishing connection. Query is [" + query + "], id is [" + id + "]");

	getData(query, params, callback);
};

exports.insertGpsGiftsRedeem = function (gpsGifts, callback) {


	var strQuery = " INTO Redemption_GPS_Gifts (DeviceID, GPSGiftID, DateTime, RedeemedStatus)";
	strQuery += " VALUES (:DeviceID, :GPSGiftID, :DateTime, :RedeemedStatus) ";

	var query = "INSERT ALL";
	var params = [];

	for (var x in gpsGifts) {

		query = query + strQuery;

		query = query.replace(/:DeviceID/g, "'" + gpsGifts[x].deviceid + "'");
		query = query.replace(/:GPSGiftID/g, "'" + gpsGifts[x].gpsgiftid + "'");
		query = query.replace(/:DateTime/g, "'" + gpsGifts[x].datetime + "'");
		query = query.replace(/:RedeemedStatus/g, "'" + gpsGifts[x].redeemedstatus + "'");
	}

	query += "SELECT * FROM DUAL";

	console.log("GPSGiftsRedeem length is [" + gpsGifts.length + "]");
	console.log("concatenated query to execute is [" + query + "]");

	insertData(query, params, callback);
};

exports.getGiftsRedeem = function (id, callback) {

	var query;
	var params;
	if (id != null && id != undefined) {
		query = `SELECT ID, GameSourceID, GameSource, DateTime, MemberID, RedeemedStatus
		FROM Redemption_Gifts
		WHERE ID = :id`;

		params = [id];

	} else {
		query = `SELECT ID, GameSourceID, GameSource, DateTime, MemberID, RedeemedStatus
		FROM Redemption_Gifts`;

		params = [];
	}

	console.log("Inside getGiftsRedeem, before establishing connection. Query is [" + query + "], id is [" + id + "]");

	getData(query, params, callback);
};

exports.insertGiftsRedeem = function (gifts, callback) {


	var strQuery = " INTO Redemption_Gifts (GameSourceID, GameSource, DateTime, MemberID, RedeemedStatus)";
	strQuery += " VALUES (:GameSourceID, :GameSource, :DateTime, :MemberID, :RedeemedStatus) ";

	var query = "INSERT ALL";
	var params = [];

	for (var x in gifts) {

		query = query + strQuery;

		query = query.replace(/:GameSourceID/g, "'" + gifts[x].gamesourceid + "'");
		query = query.replace(/:GameSource/g, "'" + gifts[x].gamesource + "'");
		query = query.replace(/:DateTime/g, "'" + gifts[x].datetime + "'");
		query = query.replace(/:MemberID/g, "'" + gifts[x].memberid + "'");
		query = query.replace(/:RedeemedStatus/g, "'" + gifts[x].redemptionstatus + "'");
	}

	query += "SELECT * FROM DUAL";

	console.log("Redeemed Gifts length is [" + gifts.length + "]");
	console.log("concatenated query to execute is [" + query + "]");

	insertData(query, params, callback);
};

exports.getCrosswordRedeem = function (id, callback) {

	var query;
	var params;
	if (id != null && id != undefined) {
		query = `SELECT ID, DeviceID, CrosswordID, EventDateTime, EventType, EngagementCount, RedeemedStatus
		FROM Redemption_Crosswords
		WHERE ID = :id`;

		params = [id];

	} else {
		query = `SELECT ID, DeviceID, CrosswordID, EventDateTime, EventType, EngagementCount, RedeemedStatus
		FROM Redemption_Crosswords`;

		params = [];
	}

	console.log("Inside getGiftsRedeem, before establishing connection. Query is [" + query + "], id is [" + id + "]");

	getData(query, params, callback);
};

exports.insertCrosswordsRedeem = function (crosswords, callback) {


	var strQuery = " INTO Redemption_Crosswords (DeviceID, CrosswordID, EventDateTime, EventType, EngagementCount, RedeemedStatus)";
	strQuery += " VALUES (:DeviceID, :CrosswordID, :EventDateTime, :EventType, :EngagementCount, :RedeemedStatus) ";

	var query = "INSERT ALL";
	var params = [];

	for (var x in crosswords) {

		query = query + strQuery;

		query = query.replace(/:DeviceID/g, "'" + crosswords[x].deviceid + "'");
		query = query.replace(/:CrosswordID/g, "'" + crosswords[x].crosswordid + "'");
		query = query.replace(/:EventDateTime/g, "'" + crosswords[x].eventdatetime + "'");
		query = query.replace(/:EventType/g, "'" + crosswords[x].eventtype + "'");
		query = query.replace(/:EngagementCount/g, "'" + crosswords[x].engagementcount + "'");
		query = query.replace(/:RedeemedStatus/g, "'" + crosswords[x].redemptionstatus + "'");
	}

	query += "SELECT * FROM DUAL";

	console.log("Redeemed Crosswords length is [" + crosswords.length + "]");
	console.log("concatenated query to execute is [" + query + "]");

	insertData(query, params, callback);
};



function getData(query, params, callback) {

	// Get a non-pooled connection
	oracledb.getConnection({
			user: dbConfig.user,
			password: dbConfig.password,
			connectString: dbConfig.connectString
		},
		function (err, connection) {
			if (err) {
				console.error(err.message);
				return;
			}


			connection.execute(
				// The statement to execute
				query,

				// The "bind value" 180 for the bind variable ":id"
				params,

				// execute() options argument.  Since the query only returns one
				// row, we can optimize memory usage by reducing the default
				// maxRows value.  For the complete list of other options see
				// the documentation.
				{
					//maxRows: 1
					//, outFormat: oracledb.OBJECT  // query result format
					//, extendedMetaData: true      // get extra metadata
					//, fetchArraySize: 100         // internal buffer allocation size for tuning
				},

				// The callback function handles the SQL execution results
				function (err, result) {
					if (err) {
						console.error(err.message);
						doRelease(connection);
						return;
					}
					console.log(result.metaData); // E.g. [ { name: 'ORDERID' }, { name: 'PRODUCT' } ]
					console.log(result.rows); // E.g. [ [ 180, 'Holy Socks' ] ]
					doRelease(connection);

					callback(result.metaData, result.rows);
				});
		});
}

function insertData(query, params, callback) {

	// Get a non-pooled connection
	oracledb.getConnection({
			user: dbConfig.user,
			password: dbConfig.password,
			connectString: dbConfig.connectString
		},

		function (err, connection) {

			if (err) {
				console.error(err.message);
				return;
			}

			// for (var x in orders) {

			connection.execute(
				query, params, // Bind values
				{
					autoCommit: true
				}, // Override the default non-autocommit behavior
				function (err, result) {
					if (err) {
						console.error("Error ocurred [" + err.message + "]");
						doRelease(connection);
						return;
					}
					console.log("Rows inserted: " + result.rowsAffected); // 1?
					doRelease(connection);
					callback();
				});
			// }
		});
}



// Note: connections should always be released when not needed
function doRelease(connection) {
	connection.close(
		function (err) {
			if (err) {
				console.error(err.message);
			}
		});
}

function sendRequest(host, port, path, method, body, secured, callback) {

	try {

		var post_req = null;

		var options = {
			host: host,
			port: port,
			path: path,
			method: method,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache'
			}
		};

		var transport = secured ? https : http;

		post_req = transport.request(options, function (res) {

			console.log("Sending [" + host + ":" + port + path + "] under method [" + method + "]");
			console.log('STATUS: ' + res.statusCode);
			console.log('HEADERS: ' + JSON.stringify(res.headers));
			res.setEncoding('utf8');
			var fullResponse = "";

			res.on('data', function (chunk) {
				fullResponse += chunk;
			});

			res.on('end', function () {

				console.log('Response: ', fullResponse);

				try {
					var result = JSON.parse(fullResponse);
				} catch (error) {

					console.log("An unexpected error just occured [" + error + "] - Please verify input and try again");
				}
				// Executing callback function:
				callback(result);
			});
		});

		post_req.on('error', function (e) {
			console.log('There was a problem with request: ' + e.message);
			return undefined;
		});

		post_req.write(body);
		post_req.end();

	} catch (error) {

		console.log("An unexpected error just occured [" + error + "] - Please verify input and try again");
	}

}

exports.getNewID = function () {

	var length = 6,
		charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
		retVal = "";
	for (var i = 0, n = charset.length; i < length; ++i) {
		retVal += charset.charAt(Math.floor(Math.random() * n));
	}
	return "ORD_" + retVal;
}