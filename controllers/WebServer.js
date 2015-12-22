function WebServer(){
    this.port = null;
}

WebServer.prototype.start = function () {
    return this;
};

module.exports = new WebServer();
