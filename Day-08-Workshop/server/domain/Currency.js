'use strict';

var nextId = 1;

var Currency = function(params) {
    this.id = nextId++;
    this.name = params.name;
    this.description = params.description;
    this.approved = params.approved || false;
};

module.exports = Currency;