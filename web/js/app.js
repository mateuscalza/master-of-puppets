// This is a draft code for tests
function arrangeAndSet(obj, prop, value) {
    var way = typeof prop === 'string' ? prop.split('.') : prop;
    var current = way[0];
    if (way.length == 1) {
        obj[current] = value;
    } else if (typeof obj[current] !== 'object') {
        obj[current] = {};
        arrangeAndSet(obj[current], way.splice(1), value);
    } else {
        arrangeAndSet(obj[current], way.splice(1), value);
    }
}

// Gambiarra (temporary MacGyverism)
var request = new XMLHttpRequest();
request.open('GET', '/settings.json', false); // `false` makes the request synchronous
request.send(null);

if (request.status === 200) {
    window.settings = JSON.parse(request.response);
}

var app = angular.module('master', []);

app.factory('socket', function($rootScope, $window) {
    var socket = io.connect('http://' + location.hostname + ':' + $window.settings.socket.port);
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    };
});

app.controller('NodeCtrl', ['$scope', 'socket', function($scope, socket) {

    $scope.input = '';

    $scope.result = null;

    $scope.nodes = {};

    socket.on('structure', function(data) {
        console.log(data);
        $scope.nodes = data;
    });

    socket.on('objectUpdate', function(changes) {
        for (var index in changes) {
            var change = changes[index];
            if (change.type === 'update' || change.type === 'add') {
                arrangeAndSet($scope.nodes, change.path + '.' + change.field, change.value);
            }
        }
    });

    function findByName(obj, stack) {
        for (var key in obj) {
            if (typeof obj[key] === 'object') {
                var nameOrTitle = obj[key].name || obj[key].title;
                if (nameOrTitle) {
                    var nodeName = new RegExp('\\b' + nameOrTitle.replace(' ', '\\s').trim() + '\\b', 'gi');
                    var replacer = new RegExp('.*\\b' + nameOrTitle.replace(' ', '\\s').trim() + '\\b', 'gi');
                    if (stack.match(nodeName)) {
                        if (obj[key].sub) {
                            return findByName(obj[key].sub, stack.replace(replacer, ''));
                        } else {
                            return obj[key];
                        }
                    }
                }
            }
        }
    }

    $scope.go = function(evt) {
        if ($scope.input) {
            var words = $scope.input.match(/\b[a-zA-Zà-úÀ-Ú0-9]{1,}\b/gi);
            if (words.length) {
                $scope.result = findByName($scope.nodes.sub, words.join(' '));
                if($scope.result){
                    socket.emit('call', {
                        path: $scope.result.path
                    });
                }
            }
        }
    };

    window.globalScope = $scope;
}]);

app.filter('obj', function() {
    return function(input) {
        return angular.isObject(input);
    };
});

app.directive('node', function() {
    return {
        scope: {
            node: '=node'
        },
        template: '<h4>' +
            '{{ node.title }}' +
            '</h4>' +
            '<ul>' +
            '<li ng-repeat="(name, content) in node.sub" ng-if="content | obj">' +
            '<div ng-if="content.sub" node="content" class="node"></div>' +
            '<div ng-if="!content.sub">' +
            '<applicator directive="content.job.directive" data="content"></applicator>' +
            '</div>' +
            '</li>' +
            '</ul>'
    }
});

app.directive('applicator', function($compile) {
    return {
        template: '<div></div>',
        replace: true,
        transclude: true,
        scope: {
            directive: '=directive',
            data: '=data'
        },
        link: function(scope, element, attrs) {
            element.empty();
            element.append($compile('<div ' + scope.directive + '="data"></div>')(scope));
        }
    }
});

app.directive('action', function($compile, socket) {
    return {
        template: '<button>{{ action.name }}</button>',
        replace: true,
        transclude: true,
        scope: {
            action: '=action'
        },
        link: function(scope, element, attrs) {
            console.log(scope);
            element.bind('click', function() {
                socket.emit('call', {
                    path: scope.action.path
                });
            });
        }
    }
});
