/**
 * Constructs a Job.
 * Base for all jobs.
 *
 * @constructor
 */
function Job() {

}
Job.prototype.call = function(){
    console.warn('There is a job without call function. It\'s strange!');
};

module.exports = Job;
