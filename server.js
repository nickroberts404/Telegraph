// server.js

var express = require('express');
var app = express();
var morgan = require('morgan');
var chalk = require('chalk');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
})

io.on('connection', socket => {
	console.log(chalk.yellow('new connection'));
	socket.on('chunk', data => {
		console.log(data);
	})
})

server.listen(3000, () => console.log(chalk.red('Listening at http://localhost:3000')));