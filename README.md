# Master of Puppets
Control everything in Node, remotely. Using socket and Object.observe().

## Installation

  npm install master-of-puppets --save

## Usage

```JavaScript
  // Require MOP
  var mop = require('master-of-puppets');

  // Example using robotjs
  var robot = require('robotjs');

  // Create a group
  mop.group('keyboard', 'Keyboard');

  // Define a puppet
  mop.group('keyboard').puppet('space', 'Space', mop.job.Action, function(){
    robot.keyTap('space');
  });
```

## Tests

  npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.1.0 Initial release
