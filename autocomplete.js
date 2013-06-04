/* IDE-style autocompletion for HTML textboxes */

/*
 * Helpers
 */

/* Add a startsWith method to the String class */
String.prototype.startsWith = function(substring) {
    return this.valueOf().lastIndexOf(substring, 0) === 0;
}

/* Method to insert completions into textbox */
function insertCompletion(textbox, completion) {
    textbox.value += completion;
    textbox.selectionStart = textbox.textLength - completion.length;
    console.log(textbox.textLength, completion.length);
}

function goToEnd(textbox) {
    textbox.selectionStart = textbox.textLength;
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

    /*
     * New event handler using closure to preserve state between calls
     */
    $('#textbox').on('keydown keyup',
        (function () {
            var dict = new Dictionary;
            var textbox = document.getElementById('textbox');
            var completions = [];
            var current = 0;

            return function (e) {
                var text = textbox.value.trim();

                if (e.type == 'keydown') {
                    if (e.which == 13 && completions.length > 0) { // Enter
                        goToEnd(textbox);                        
                        e.preventDefault(); // JQuery
                        completions = [];
                    }
                }

                if (e.type == 'keyup') {
                    if (e.which == 32 || e.which == 13) { // Space or enter
                        var last = text.split(/\s|\n/).pop();
                        dict.insert(last);
                        completions = [];
                    }
                    else { // Anything else
                        console.log('Fill branch called');
                        var fragment = text.split(/\s|\n/).pop();
                        completions = dict.getCompletions(fragment);
                        if (completions[current]) {
                            insertCompletion(textbox, completions[current]);
                        }
                    }
                }
                console.log(e);
                console.log(dict.words);
                console.log(completions);
            }
        })()
    );

    /* button for testing functions */
    $('#test').click(closure()); // execute on creation

});

// testing if i can define the handler somewhere else
var closure = (function () {
    var count = 0;
    return function (event) {
        alert(count);
        count ++;
    };
});

var dict = new Dictionary();
