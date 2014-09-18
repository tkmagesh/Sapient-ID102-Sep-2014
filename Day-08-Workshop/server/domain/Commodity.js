'use strict';

var nextId = 1;

var Commodity = function(params) {
    this.id = nextId++;
    this.name = params.name;
    this.class = params.class;
    this.startDate = params.startDate;
    this.endDate = params.endDate;
    this.approved = params.approved || false;
};

module.exports = Commodity;