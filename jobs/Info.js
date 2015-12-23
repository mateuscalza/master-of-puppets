var Job = require('./Job'),
	Change = require('../models/Change');

/**
 * Constructs a Info.
 * Simple job that watch a object for data presentation.
 *
 * @constructor
 *
 * @param {function} func
 *   Function that will be called when Info triggered.
 */
function Info(object) {
    Job.call(this);
    this.directive = 'info';
    this.object = object;

    var self = this;
    Object.observe(this.object, function (updates) {
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
        //if (changes.length && self.root && self.root().currentSocket && self.root().currentSocket.io && self.root().currentSocket.io.sockets) {
        	console.log('Update!', changes);
        //	self.root().currentSocket.io.sockets.emit('objectUpdate', changes);
        //}
    });

    return this;
}
Info.prototype = new Job();
Info.prototype.constructor = Info;


module.exports = Info;
