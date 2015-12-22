var Puppet = require('./Puppet.js');
var Node = require('./Node.js');

/**
 * Constructs a Group.
 * Structure to wrap groups and puppets.
 * 
 * @constructor
 *
 * @param {string} key
 *   Key used to create link with wrapper group.
 * @param {string} title
 *   Title of group.
 * @param {string} path
 *   Path from parent to be extended.
 */
function Group(key, title, path) {
    this.key = key;
    this.title = title;
    if (path === null) {
        this.path = '';
    } else {
        this.path = path ? path + '.sub.' + key : 'sub.' + key;
    }
    this.sub = {};

    Node.call(this);
}
Group.prototype = new Node();
Group.prototype.constructor = Group;

Group.prototype.group = function (key, title) {
    if (!title) {
        return this.sub[key];
    }
    return this.sub[key] = new Group(key, title, this.path);
};

Group.prototype.puppet = function (key, name) {
    if (!name) {
        return this.sub[key];
    }
    return this.sub[key] = new Puppet(key, name, this.path);
};

module.exports = Group;
