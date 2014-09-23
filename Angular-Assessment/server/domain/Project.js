'use strict';

var nextId = 1;

var Project = function(params) {
    this.id = nextId++;
    this.projectName = params.projectName;
    this.startDate = params.startDate;
    this.endDate = params.endDate;
};

module.exports = Project;