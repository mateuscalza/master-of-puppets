var Change = require('./Change');

/**
 * Node to be extended.
 * Basic observe operation to be extended.
 *
 * @constructor
 */
function Node() {
	var self = this;
    Object.observe(this, function (updates) {
        var changes = [];
        for (var index in updates) {
            var update = updates[index];
            if(typeof update.object[update.name] !== 'object' 
            	&& typeof update.oldValue !== 'object'
            	&& typeof update.object[update.name] !== 'function' 
            	&& typeof update.oldValue !== 'function'){
            	changes.push(new Change(update));
    		}
        }
        if (changes.length && self.root && self.root().currentSocket && self.root().currentSocket.io && self.root().currentSocket.io.sockets) {
        	console.log('Update!', changes);
        	self.root().currentSocket.io.sockets.emit('objectUpdate', changes);
        }
    });
}

module.exports = Node;
