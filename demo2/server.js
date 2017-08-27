var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

app.use('/', express.static(__dirname + '/www'));
server.listen(3000);
console.log('server started');

io.on('connection', function(socket){
	socket.on('chat msg', function(data){
		console.log(data);
	});
});