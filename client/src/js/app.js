// app.js
var React = require('react');
var render = require('react-dom').render;
var socket = require('socket.io-client')();
console.log('Welcome to telegraph...');

export default class Telegraph extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			message: '',
			time: null
		}
	}

	handleKeyDown(e) {
		e.preventDefault();
		if(e.keyCode === 32 && !e.repeat) {
			this.setTime();
		}
	}

	handleKeyUp(e) {
		e.preventDefault();
		if(e.keyCode === 32 && !e.repeat) {
			var holdTime = this.getTimeOffset();
			if(holdTime < this.props.timeUnit) {
				this.addDot();
			} else {
				this.addDash();
			}
			this.setTime();
			console.log(this.state.message);
		}
	}

	setTime() {
		this.setState({time: Date.now()});
	}

	getTimeOffset(time = Date.now()) {
		return time - (this.state.time || time);
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
		this.setState({message: this.state.message + '   '})
	}

	undo() {

	}

	componentDidMount() {
		window.addEventListener('keydown', this.handleKeyDown.bind(this));
		window.addEventListener('keyup', this.handleKeyUp.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener('keydown', this.handleKeyDown.bind(this));
		window.removeEventListener('keyup', this.handleKeyUp.bind(this));
	}

	render() {
		return (
			<p>Tap to begin a message</p>
		)
	}
}

Telegraph.propTypes = {
	timeUnit: React.PropTypes.number,
	addDot: React.PropTypes.func,
	addDash: React.PropTypes.func,
	addLetterSpace: React.PropTypes.func,
	addWordSpace: React.PropTypes.func,
	undo: React.PropTypes.func,
}
Telegraph.defaultProps = {
	timeUnit: 200
}

render(<Telegraph />, document.getElementById('app'));