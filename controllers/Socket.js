function Socket(){
    this.port = null;
}

Socket.prototype.start = function () {
    return this;
};

module.exports = new Socket();
