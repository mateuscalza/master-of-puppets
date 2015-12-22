function Change(update){
  this.path = update.object.path;
  this.type = update.type;
  this.field = update.name;
  this.value = update.object[update.name];
  this.oldValue = update.oldValue;
}

module.exports = Change;
