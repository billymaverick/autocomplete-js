/* Get cursor position in textarea */
function getCursorPosition(label) {
    var textArea = document.getElementById(label);
    var position = textArea.selectionStart;
    return position;
}

/* Get selection start and end position in textarea */
function getSelectionRange(label) {
    var textArea = document.getElementById(label);
    var range = {start: textArea.selectionStart, end: textArea.selectionEnd};
    console.log(range);
    return range;
}

/* Get all text from textbox */
function getTextFromArea(label) {
    var textArea = document.getElementById(label);
    var text = textArea.value;
    return text;
}

/* 
 * The dictionary object. Interface matches my trie implementation, just in case 
 */
function Dictionary() {
    this.words = [];
}

Dictionary.prototype.insert = function(words) {
    for (var i = 0; i < words.length; i++) {
        this.words.push(words[i]);
    }
}

Dictionary.prototype.wordsStartingWith = function(substring) {
    var matches = [];
    for (var i = 0; i < this.words.length; i++) {
        if (this.words[i].startsWith(substring)) {
            matches.push(words[i]);
        }
    }
    return matches;
}

/* Function to poll the textbox for latest input */
function updateDictionary() {
    return null;
}

/* need this to run functions when page loads */
$(document).ready(function() {
    console.log('ready called');

    $('#textbox').keyup(function() {
        alert('keyup handler called'); // TODO write event handler to update dict
    });

    $('#test').click(function() {
        console.log('Pay arrrght!' + ' ' + crips);
        crips ++;
    });
});
