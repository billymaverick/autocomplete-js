/* Javascript translation of Python trie code
 * Isaac Stead, May 2013
 */

/* Trie node object */
function Node() {
    this.edges = {};
    this.word = null;
}

/* The trie data structure and methods */
function Trie() {
    this.root = new Node();
}

Trie.prototype.insert = function(string) {
    var node = this.root;
    for (var i = 0; i < string.length; i++) {
        var c = string[i];
        if (!node.edges[c]) {
            node.edges[c] = new Node();
        }
        node = node.edges[c];
    }
    node.word = string;
}

Trie.prototype.find = function(string) {
    var node = this.root;
    for (var i = 0; i < string.length; i++) {
        var c = string[i];
        if (!node.edges[c]) {
            return false;
        }
        node = node.edges[c];
    }
    return node;
}

Trie.prototype.has = function(string) {
    var node = this.find(string);
    if (!node || !node.word) {
        return false;
    } else {
        return true;
    }
}

Trie.prototype.wordsStartingWith = function(substring) {
    var start = this.find(substring);
    var words = [];
    var stack = [];
    if (start) {
        stack = [start];
    }
    while (stack.length > 0) {
        var node = stack.pop();
        if (node.word) {
            words.push(node.word);
        }
        for (var edge in node.edges) {
            stack.push(node.edges[edge]);
        }
    }
    return words;
}

/* Testing functions */

function test() {
    var words = ['crips', 'creole', 'crew', 'crass', 'cray'];
    var trie = new Trie();
    // Test insertion
    for (var i = 0; i < words.length; i++) {
        trie.insert(words[i]);
    }
    console.log('insert => OK?');
    // Test has method
    if (trie.has('crips')) {
        console.log('has => OK');
    }
    // Test words_below method
    if (trie.words_below('cra') == ['cray', 'crass']) { // Order matters! do some comparison
        console.log('words_below => OK');
    }
    return trie;
}
