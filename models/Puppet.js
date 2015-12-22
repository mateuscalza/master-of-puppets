var Node = require('./Node.js');

function Puppet(key, name, path){
  this.key = key;
  this.name = name;
  this.path = path ? path + '.sub.' + key : 'sub.' + key;

	Node.call(this);
}
Puppet.prototype = new Node();
Puppet.prototype.constructor = Puppet;

module.exports = Puppet;
