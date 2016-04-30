// app.js
import React from 'react';
import {render} from 'react-dom';
import Telegraph from './telegraph.js';
var socket = require('socket.io-client')();
console.log('Welcome to telegraph...');

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
		}
	}

	addDot() {
		this.setState({message: this.state.message + '.'})
	}

	addDash() {
		this.setState({message: this.state.message + '-'})
	}

	addLetterSpace() {
		this.setState({message: this.state.message + ' '})
	}

	addWordSpace() {
		this.setState({message: this.state.message + '  '})
	}

	undo() {

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

render(<App />, document.getElementById('app'));