/* IDE-style autocompletion for HTML textboxes */

/*
 * Helpers
 */

/* Add a startsWith method to the String class */
String.prototype.startsWith = function(substring) {
    return this.valueOf().lastIndexOf(substring, 0) === 0;
}

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
 * The autocomplete dictionary object 
 */

function Dictionary() {
    this.words = [];
}
/* Insert a word into the dictionary */
Dictionary.prototype.insert = function(word) {
    if (this.words.indexOf(word) == -1) {
        this.words.push(word);
    }
}
/* Get all words starting with substring */
Dictionary.prototype.wordsStartingWith = function(substring) {
    var matches = [];
    for (var i = 0; i < this.words.length; i++) {
        if (this.words[i].startsWith(substring)) {
            matches.push(this.words[i]);
        }
    }
    return matches;
}
/* Get all strings that complete substring TODO change so it doesn' loop twice */
Dictionary.prototype.getCompletions = function(substring) {
    var matches = this.wordsStartingWith(substring);
    for (var i = 0; i < matches.length; i++) {
        matches[i] = matches[i].substring(substring.length);
    }
    return matches;
}

/*
 * Event handlers
 */

$(document).ready(function() {

    //  BUG : Pressing backspace triggers completion so you can't delete words
    
    $('#textbox').keyup(function(event) {
        var text = $(this).val().trim();
        var textbox = document.getElementById('textbox');
        var hasCompletion = false; // closure?, why can't I do the same with dict
        var currentCompletions;
        console.log(currentCompletions);
        
        //TODO use a switch/case statement here
        
        /* If spacebar is typed, save the last word typed for autocompletion. */
        if (event.which == 32) { // Spacebar
            var words = text.split(' ');
            var last = words.pop();
            dict.insert(last);
        }
        else if (event.which == 9) { // Tab key
            console.log('tab key pushed');
            if (hasCompletion) {
                // cycle through possible completions, with insertion function
            }
        }
        /* If a letter is typed, prompt for autocompletion. 
         * TODO Put insertion code in a separate function
         */
        else {
            var fragment = text.split(' ').pop();
            var completions = dict.getCompletions(fragment);
            if (completions.length > 0) {
                textbox.value += completions[0];
                textbox.selectionStart = textbox.textLength - completions[0].length;
                hasCompletion = true;
                currentCompletions = completions;
            }
            else {
                hasCompletion = false;
            }
        }
        console.log(hasCompletion);
    });

    /* Button for testing functions */
    $('#test').click(function(event) {
        console.log('Hi');
    });

});

var dict = new Dictionary();
