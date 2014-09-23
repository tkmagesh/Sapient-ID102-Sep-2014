'use strict';

var _ = require('lodash'),
    Project = require('./domain/Project.js'),
    Bug = require('./domain/Bug.js'),
    repository = require('./repository.js')


var fixtures = (function() {
    var loadProjects = function() {
      var projects = [{
        projectName : "Capital Markets",
        startDate : new Date("10-Mar-2013"),
        endDate : null
      },{
        projectName : "Compliance Review",
        startDate : new Date("10-Feb-2014"),
        endDate : null
      },{
        projectName : "Asset Tracker",
        startDate : new Date("10-Apr-2013"),
        endDate : null
      }];
      repository.projects = [];
      _.forEach(projects, function(item) {
            repository.projects.push(new Project(item));
        });
    };

    var loadBugs = function(){
      var bugs = [{
        title : "Unable to login",
        projectId : 1,
        description : "The user is not able login even with valid credentials",
        status : "open",
        openDate : new Date("10-Apr-2013"),
        closeDate : null
      },{
        title : "New market not listed",
        projectId : 1,
        description : "The newly added market is not found in the list",
        status : "open",
        openDate : new Date("11-Apr-2013"),
        closeDate : null
      },{
        title : "Unable to remove market",
        projectId : 1,
        description : "The user is unable to remove the existing market",
        status : "open",
        openDate : new Date("12-Apr-2013"),
        closeDate : null
      },{
        title : "Review records not found",
        projectId : 2,
        description : "Review records are not listed in the records page",
        status : "close",
        openDate : new Date("10-May-2014"),
        closeDate : new Date("10-May-2014")
      },{
        title : "Unable to close a review record",
        projectId : 2,
        description : "The review record rec-2349 is unable to be closed",
        status : "open",
        openDate : new Date("11-May-2014"),
        closeDate : null
      },{
        title : "Not able to export review records",
        projectId : 2,
        description : "The review records should be exportable in excel format",
        status : "open",
        openDate : new Date("12-May-2014"),
        closeDate : null
      },{
        title : "Asset not found",
        projectId : 3,
        description : "An existing asset is not found when searched using the application",
        status : "open",
        openDate : new Date("10-May-2013"),
        closeDate : null
      },{
        title : "Unable to add a new asset",
        projectId : 3,
        description : "The application not allowing the user to add a new asset",
        status : "open",
        openDate : new Date("11-May-2013"),
        closeDate : null
      },{
        title : "Unable to remove an existing asset",
        projectId : 3,
        description : "The user is unable to remove the existing asset",
        status : "open",
        openDate : new Date("12-May-2013"),
        closeDate : null
      }];

      repository.bugs = [],
       _.forEach(bugs, function(item) {
            repository.bugs.push(new Bug(item));
        });
    };
    
    return {
        loadAll: function() {
            loadProjects();
            loadBugs();
        }
    };
})();

module.exports = fixtures;