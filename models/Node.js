var Change = require('./Change.js');

/**
 * Constructs a Node.
 * Basic observe operation to be extended.
 * 
 * @constructor
 */
function Node() {

    Object.observe(this, function (updates) {
        var changes = [];
        for (var index in updates) {
            var update = updates[index];
            changes.push(new Change(update));
        }
        if (changes.length) {

        }
    });
}

module.exports = Node;
