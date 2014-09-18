'use strict';

var nextId = 1;

var User = function(params) {
    this.id = nextId++;
    this.username = params.username;
    this.password = params.password;
    this.firstName = params.firstName;
    this.lastName = params.lastName;
    this.role = params.role || 'business'; // could also be approver or admin
    this.approved = params.approved || false;
};

module.exports = User;