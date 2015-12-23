var socketio = require('socket.io'),
dotProp = require('dot-prop');

/**
* Constructs a Socket.
* Socket manager powered by Socket.IO.
*
* @constructor
*/
function Socket(){
    this.port = null;
    this.io = null;
    this.scope = {};
}

Socket.prototype.start = function () {
    var self = this;
    var settings = self.scope.settings();

    self.io = socketio(settings.socket.port);

    self.io.on('connection', function (socket) {
        socket.emit('structure', self.scope);
        socket.on('call', function(data){
            dotProp.get(self.scope, data.path).job.call(data);
            
            //var actuating = arrangeAndGet(moduleData.map, data.path);
            //actuating.work.react.call(actuating.work, data, actuating);
        });
    });

    console.info('Socket is ready! On port: ' + settings.socket.port);
    return self;
};

module.exports = new Socket();
