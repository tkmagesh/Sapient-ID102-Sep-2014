'use strict';

var nextId = 1;

var Market = function(params) {
    this.id = nextId++;
    this.name = params.name;
    this.locationId = params.locationId;
    this.currencyId = params.currencyId;
    this.commodityIds = params.commodityIds || [];
    this.startDate = params.startDate;
    this.endDate = params.endDate;
    this.approved = params.approved || false;
};

module.exports = Market;