// telegraph.js
import React from 'react';

export default class Telegraph extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			time: null,
			letterTimeout: null,
			wordTimeout: null,
		}
	}

	handleKeyDown(e) {
		e.preventDefault();
		if(e.keyCode === 32 && !e.repeat) {
			this.clearTimeouts();
			this.setTime();
		}
	}

	handleKeyUp(e) {
		e.preventDefault();
		if(e.keyCode === 32 && !e.repeat) {
			var holdTime = this.getTimeOffset();
			if(holdTime < this.props.timeUnit) {
				this.props.addDot();
			} else {
				this.props.addDash();
			}
			this.setTime();
			this.setTimeouts();
		}

	}

	clearTimeouts() {
		window.clearTimeout(this.state.letterTimeout);
		window.clearTimeout(this.state.wordTimeout);
	}

	setTimeouts() {
		var letterTimeout = window.setTimeout(this.props.addLetterSpace.bind(this), this.props.timeUnit);
		var wordTimeout = window.setTimeout(this.props.addWordSpace.bind(this), this.props.timeUnit * 3);
		this.setState({letterTimeout, wordTimeout});
	}

	setTime() {
		this.setState({time: Date.now()});
	}

	getTimeOffset(time = Date.now()) {
		return time - (this.state.time || time);
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