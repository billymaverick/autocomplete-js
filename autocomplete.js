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
    textbox.selectionStart = textbox.textlength - completion.length;
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
    $('#textbox2').keyup( 
        (function () {
            var dict = new Dictionary();
            var box = $('#textbox2');
            var currentcompletions = []; // this could be another closure...
            var i = 0;

            return function (event) {
                var text = box.val().trim();

                if (event.which == 32) { // todo put keycodes into object
                    var last = text.split(' ').pop();
                    dict.insert(last);
                }
                else if (event.which == 35) { // Cycle through completion indices
                    i++; // Need to reset this to cycle through >> def make it a closure
                }
                else {
                    var fragment = text.split(' ').pop();
                    currentcompletions = dict.getCompletions(fragment);
                    if (currentcompletions[i]) {
                        insertCompletion(box, currentcompletions[i]);
                    }
                }
                console.log(dict);
                console.log(currentcompletions);
        };})()
    );

    /* button for testing functions */
    $('#test').click( 
            (function (event) {
                var count = 0;
                return function() { 
                    alert(count);
                    count ++;
                };
            })()
    ); // execute on creation

});

// testing if i can define the handler somewhere else

var dict = new Dictionary();
