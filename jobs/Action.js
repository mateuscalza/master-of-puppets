var Job = require('./Job');

/**
 * Constructs a Action.
 * Simple job that call a server function.
 *
 * @constructor
 *
 * @param {function} func
 *   Function that will be called when Action triggered.
 */
function Action(func, config) {
    Job.call(this);
    this.call = func;
    this.directive = 'action';

    return this;
}
Action.prototype = new Job();
Action.prototype.constructor = Action;


module.exports = Action;
