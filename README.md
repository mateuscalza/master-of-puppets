# Master of Puppets
Control everything in Node, remotely. Using socket and Object.observe().

## Installation

  npm install master-of-puppets --save

## Usage

```JavaScript
  var masterOfPuppets = require('master-of-puppets');gddfgdfg

  masterOfPuppets.group('initial', 'Initial commands', function(group) {
    group.task('hello', 'Say hello', function(){
        console.log('Hello from MOP!');
    });
  });
```

## Tests

  npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release
