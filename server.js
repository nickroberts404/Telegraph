// server.js

var express = require('express');
var app = express();
var morgan = require('morgan');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
})

io.on('connection', socket => {
	console.log('new connection');
})

server.listen(3000, () => console.log('Listening at http://localhost:3000'));