// app.js
import React, {PropTypes, Component} from 'react';
import {render} from 'react-dom';
import Telegraph from './telegraph.js';
var socket = require('socket.io-client')();
console.log('Welcome to telegraph...');

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			message: ''
		}
	}

	addDot() {
		this.setState({message: this.state.message + '.'})
		if(this.props.chunk === 'boop') this.emitMessage();
	}

	addDash() {
		this.setState({message: this.state.message + '-'})
		if(this.props.chunk === 'boop') this.emitMessage();
	}

	addLetterSpace() {
		this.setState({message: this.state.message + ' '})
		if(this.props.chunk === 'letter') this.emitMessage();
	}

	addWordSpace() {
		this.setState({message: this.state.message + '  '})
		if(this.props.chunk === 'word') this.emitMessage();
	}

	emitMessage() {
		console.log('[App.emitMessage] Emitting message!');
		socket.emit('message', {message: this.state.message});
		this.setState({message: ''});
	}

	undo() {
		// Will erase previous letter or space.
	}

	render() {
		return (
			<div className="container">
				<Telegraph 
					addDot={this.addDot.bind(this)}
					addDash={this.addDash.bind(this)}
					addLetterSpace={this.addLetterSpace.bind(this)}
					addWordSpace={this.addWordSpace.bind(this)}
					undo={this.undo.bind(this)} />
				<div>{this.state.message}</div>
			</div>
		)
	}
}

App.propTypes = {
	chunk: PropTypes.oneOf(['boop', 'letter', 'word']).isRequired
}

App.defaultProps = {
	chunk: 'word'
}

render(<App />, document.getElementById('app'));