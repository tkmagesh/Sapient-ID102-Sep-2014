/*
 Documentation on http://angular.github.io/protractor/#/
 */

exports.config = {
    specs: [ 'integration/**/*.spec.js' ],
    baseUrl: 'http://localhost:9000',

    capabilities: {
        'browserName': 'chrome'
    }
};