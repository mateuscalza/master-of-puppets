var Group = require('./models/Group.js'),
        Socket = require('./controllers/Socket.js'),
        WebServer = require('./controllers/WebServer.js'),
        dotProp = require('dot-prop'),
        extend = require('extend');

var settings = {
    socket: {
        port: 3000
    },
    web: {
        port: 8000
    }
};

module.exports = new Group('mop', 'Master of Puppets', null);

module.exports.settings = function (userSettings) {
    if (userSettings) {
        return extend(settings, userSettings);
    }
    return settings;
};

module.exports.startSocket = function () {
    Socket.port = settings.socket.port;
    return Socket.start();
};

module.exports.startWebServer = function () {
    WebServer.port = settings.web.port;
    return WebServer.start();
};
