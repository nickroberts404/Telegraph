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
			message: '',
			chunk: ''
		}
	}

	addDot() {
		this.setState({
			message: this.state.message + '.',
			chunk: this.state.chunk + '.'
		})
		if(this.props.chunkSize === 'boop') this.emitChunk();
	}

	addDash() {
		this.setState({
			message: this.state.message + '-',
			chunk: this.state.chunk + '-'
		})
		if(this.props.chunkSize === 'boop') this.emitChunk();
	}

	addLetterSpace() {
		this.setState({
			message: this.state.message + ' ',
			chunk: this.state.chunk + ' '
		})
		if(this.props.chunkSize === 'letter') this.emitChunk();
	}

	addWordSpace() {
		this.setState({
			message: this.state.message + ' ',
			chunk: this.state.chunk + ' '
		})
		if(this.props.chunkSize === 'word') this.emitChunk();
	}

	emitChunk() {
		console.log('[App.emitChunk] Emitting Chunk!');
		socket.emit('chunk', {chunk: this.state.chunk.trim()});
		this.setState({chunk: ''});
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
	chunkSize: PropTypes.oneOf(['boop', 'letter', 'word']).isRequired
}

App.defaultProps = {
	chunkSize: 'word'
}

render(<App />, document.getElementById('app'));