var app = require('express')(),
	http = require('http').Server(app),
	io = require('socket.io')(http),
	dateFormat = require('dateformat'),
	db = require('./db'),
	messageModel = require('./message'),
	_ = require('underscore');

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

db.connect(function(err) {
	if (err) {
		console.log('Unable to connect to database');
	} else {
		console.log('Connect to database');
	}
});

io.on('connection', function(socket){
	messageModel.getAllRecords(function(err, rows) {
		if (err) {
			console.error(err);
		} else {
			var msgs = {
				dbmessages : _.map(rows, function(row) {
					return {
						msg : row.msg,
						formatTime: row.formatTime
					};
				})
			};
			socket.emit('records', msgs);
		}
	});

	socket.on('chat message', function(msg){
		var date = new Date();
		var formatTime = dateFormat(date, "mm.dd.yyyy hh:MM:ss TT");
		io.emit('chat message', {msg : msg, formatTime : formatTime});
		console.log("server: msg = %s, formatTime = %s", msg, formatTime);
		messageModel.insertRecord(msg, formatTime, function(err) {
			if (err) {
				console.error(err);
			}
		})
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});