var db = require('./db'),
	dateFormat = require('dateformat');

function getAllRecords(done) {
	db.get().query('SELECT * FROM records', function(err, rows) {
		if (err) return done(err);
		done(null, rows);
	})
}

function insertRecord(msg, formatTime, done) {
	var sql = "INSERT INTO records (msg, formatTime) VALUES (?, ?)";
	console.log("insertRecord: msg = %s, formatTime = %s", msg, formatTime);
	db.get().query(sql, [msg, formatTime], function(err, result) {
		if (err) return done(err);
	})
}

exports.getAllRecords = getAllRecords;
exports.insertRecord = insertRecord;