var express = require('express');
var socket = require('socket.io');

var app = express();

var server = app.listen(4000, function(){
	console.log('listening to port 4000');
});

var io = socket(server);

io.on('connection', function(socket) {
	io.sockets.emit('init', socket.id);

	socket.on('chat', function(data) {
		data.userId = socket.id;
		io.sockets.emit('chat', data);
	});

	socket.on('disconnect', function() {
		io.sockets.emit('disconnect', socket.id);
	});
});

