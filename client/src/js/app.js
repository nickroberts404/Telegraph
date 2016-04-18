// app.js
var React = require('react');
var render = require('react-dom').render;
var socket = require('socket.io-client')();
console.log('Welcome to telegraph...');

export default class App extends React.Component {

	handleKeyPress(e) {
		e.preventDefault();
		if(e.keyCode === 32 && !e.repeat) {
			console.log('boop');
		}
	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyPress);
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyPress);
	}

	render() {
		return (
			<p>Tap to begin a message</p>
		)
	}
}

render(<App />, document.getElementById('app'));