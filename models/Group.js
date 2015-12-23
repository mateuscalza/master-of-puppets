var Puppet = require('./Puppet');
var Node = require('./Node');

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
function Group(key, title, path, root) {
    this.key = key;
    this.title = title;
    if (path === null) {
        this.path = '';
    } else {
        this.path = path ? path + '.sub.' + key : 'sub.' + key;
    }
    this.sub = {};
    this.root = function(){
        return root ? root : this;
    }
    Node.call(this);
}
Group.prototype = new Node();
Group.prototype.constructor = Group;

Group.prototype.group = function (key, title) {
    if (!title) {
        return this.sub[key];
    }
    return this.sub[key] = new Group(key, title, this.path, this.root());
};

Group.prototype.puppet = function (key, name, Job) {
    if (!name) {
        return this.sub[key];
    }
    var args = Array.prototype.slice.call(arguments, 0, 2).concat([this.path, this.root()], Array.prototype.slice.call(arguments, 2));
    return this.sub[key] = Puppet.apply({}, args);
};

module.exports = Group;
