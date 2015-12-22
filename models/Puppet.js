var Node = require('./Node.js');

/**
 * Constructs a Puppet.
 * Structure to define actions or views, that can be controlled.
 * 
 * @constructor
 *
 * @param {string} key
 *   Key used to create link with wrapper group.
 * @param {string} name
 *   Name of puppet.
 * @param {string} path
 *   Path from parent to be extended.
 */
function Puppet(key, name, path) {
    this.key = key;
    this.name = name;
    this.path = path ? path + '.sub.' + key : 'sub.' + key;

    Node.call(this);
}
Puppet.prototype = new Node();
Puppet.prototype.constructor = Puppet;

module.exports = Puppet;
