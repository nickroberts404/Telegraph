// app.js
var React = require('react');
var render = require('react-dom').render;
var socket = require('socket.io-client')();
console.log('Welcome to telegraph...');

export default class App extends React.Component {
	render() {
		return (
			<p>Tap to begin a message</p>
		)
	}
}

render(<App />, document.getElementById('app'));