var Group = require('./models/Group'),
Socket = require('./controllers/Socket'),
WebServer = require('./controllers/WebServer'),
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

module.exports.settings = function(userSettings) {
    if (userSettings) {
        return extend(settings, userSettings);
    }
    return settings;
};

module.exports.startSocket = function() {
    Socket.port = settings.socket.port;
    Socket.scope = this;
    return Socket.start();
};

module.exports.startWebServer = function() {
    WebServer.port = settings.web.port;
    WebServer.scope = this;
    return WebServer.start();
};

module.exports.jobs = {
    Action: require('./jobs/Action')
};
