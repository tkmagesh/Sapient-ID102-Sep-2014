'use strict';

var nextId = 1;

var Bug = function(params) {
    this.id = nextId++;
    this.title = params.title;
    this.projectId = params.projectId;
    this.description = params.description;
    this.status = params.status;
    this.openDate = params.openDate;
    this.closeDate = params.closeDate;
};

module.exports = Bug;