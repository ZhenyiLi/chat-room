var mysql = require('mysql');
var pool = {};

function connect(done) {
	pool = mysql.createPool({
		host:'localhost',
		user:'Jenny',
		password:'123',
		database:'test',
		port:3306
	});
	if(done) done();
}

function get() {
	return pool;
}

exports.connect=connect;
exports.get=get;