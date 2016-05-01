// morseParser.js

var pairings = require('./morse.json');

function parse (morseCode, charDelimiter, wordDelimiter){
	var words = morseCode.split(wordDelimiter);
	var parsed = '';
	words.forEach(word => {
		var letters = word.split(charDelimiter);
		console.log(letters);
		letters.forEach(letter => {
			parsed += pairings[letter] || '?'
		})
		parsed += ' ';
	})
	return parsed;
}

module.exports = { parse };