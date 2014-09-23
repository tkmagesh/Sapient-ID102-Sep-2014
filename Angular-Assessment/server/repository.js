'use strict';

var _ = require('lodash'),
    Bug = require('./domain/Bug.js'),
    Project = require('./domain/Project.js');

var repository = (function() {
    var repo = {
        projects : [],
        createProject : function(params){
            var project = new Project(params);
            repo.projects.push(project);
            return project;
        },
        updateProject: function(id, params) {
            var project = _.find(repo.projects, { 'id': parseInt(id) });
        
            // don't update primary key
            delete params.id;
        
            _.forIn(params, function(value, key) {
                project[key] = value;
            });
        
            return project;
        },

        getProject: function(id) {
            var project = _.find(repo.projects, {'id':parseInt(id)});
            return project;

        },
        
        deleteProject: function(id) {
            return _.remove(repo.projects, { 'id': parseInt(id) });
        },
        /**/
        bugs : [],
        createBug : function(params){
            var bug = new Bug(params);
            repo.bugs.push(bug);
            return bug;
        },
        updateBug: function(id, params) {
            var bug = _.find(repo.bugs, { 'id': parseInt(id) });
        
            // don't update primary key
            delete params.id;
        
            _.forIn(params, function(value, key) {
                bug[key] = value;
            });
        
            return bug;
        },

        getBug: function(id) {
            var bug = _.find(repo.bugs, {'id':parseInt(id)});
            return bug;

        },
        
        deleteBug: function(id) {
            return _.remove(repo.bugs, { 'id': parseInt(id) });
        }

    };
    
    return repo;
})();

module.exports = repository;