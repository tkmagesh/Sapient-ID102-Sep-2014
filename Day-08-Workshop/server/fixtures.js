'use strict';

var _ = require('lodash'),
    User = require('./domain/User.js'),
    Location = require('./domain/Location.js'),
    Currency = require('./domain/Currency.js'),
    Commodity = require('./domain/Commodity.js'),
    Market = require('./domain/Market.js'),
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


    var loadUsers = function() {
        var users = [{
            username: 'user1',
            password: 'test123',
            role: 'approver'
        }, {
            username: 'user2',
            password: 'test456',
            role: 'admin'
        }, {
            username: 'user3',
            password: 'test789',
            role: 'business'
        }];
        
        repository.users = [];
    
        _.forEach(users, function(item) {
            repository.users.push(new User(item));
        });
    };
    
    var loadLocations = function() {
        var locations = [{
            name: 'Asia',
            description: 'Asia'
        }, {
            name: 'Americas',
            description: 'Americas'
        }, {
            name: 'Europe',
            description: 'Europe'
        }];
        
        repository.locations = [];

        _.forEach(locations, function(item) {
            repository.locations.push(new Location(item));
        });
    };
    
    var loadCurrencies = function() {
        var currencies = [{
            name: 'USD',
            description: 'US Dollar'
        }, {
            name: 'JPY',
            description: 'Japanese Yen'
        }, {
            name: 'INR',
            description: 'Indian Rupee'
        }, {
            name: 'GBP',
            description: 'Pound Sterling'
        }, {
            name: 'EUR',
            description: 'Euro'
        }];
        
        repository.currencies = [];

        _.forEach(currencies, function(item) {
            repository.currencies.push(new Currency(item));
        });
    };
    
    var loadCommodities = function() {
        var commodities = [{
          name: 'Soybeans',
          class: 'Agricultural',
          startDate: new Date('July 30, 2013'),
          endDate: new Date('July 30, 2014')
        }, {
          name: 'Corn',
          class: 'Agricultural',
          startDate: new Date('July 30, 2013'),
          endDate: new Date('July 30, 2014')
        }, {
          name: 'Oats',
          class: 'Agricultural',
          startDate: new Date('July 30, 2013'),
          endDate: new Date('July 30, 2014')
        }, {
          name: 'NaturalGas',
          class: 'Energy',
          startDate: new Date('July 30, 2013'),
          endDate: new Date('July 30, 2014')
        }, {
          name: 'WTICrude',
          class: 'Energy',
          startDate: new Date('July 30, 2013'),
          endDate: new Date('July 30, 2014')
        }, {
          name: 'BrentCrude',
          class: 'Energy',
          startDate: new Date('July 30, 2013'),
          endDate: new Date('July 30, 2014')
        }, {
          name: 'Gold',
          class: 'Metals',
          startDate: new Date('July 30, 2013'),
          endDate: new Date('July 30, 2014')
        }, {
          name: 'Silver',
          class: 'Metals',
          startDate: new Date('July 30, 2013'),
          endDate: new Date('July 30, 2014')
        }, {
          name: 'Copper',
          class: 'Metals',
          startDate: new Date('July 30, 2013'),
          endDate: new Date('July 30, 2014')
        }, {
          name: 'Cocoa',
          class: 'Agricultural',
          startDate: new Date('July 30, 2013'),
          endDate: new Date('July 30, 2014')
        }];
        
        repository.commodities = [];
    
        _.forEach(commodities, function(item) {
            repository.commodities.push(new Commodity(item));
        });
    };

    var loadMarkets = function() {
        var markets = [{
            name: 'CBOT',
            locationId: 2,
            currencyId: 1,
            commodityIds: [1, 2, 3],
            startDate: new Date('July 30, 2010'),
            endDate: new Date('July 30, 2014')
        }, {
            name: 'ICE',
            locationId: 2,
            currencyId: 1,
            commodityIds: [5, 6],
            startDate: new Date('July 30, 2006'),
            endDate: null
        }, {
            name: 'CME',
            locationId: 2,
            currencyId: 1,
            commodityIds: [10, 1, 2, 3],
            startDate: new Date('July 30, 1999'),
            endDate: null
        }, {
            name: 'NYMEX',
            locationId: 2,
            currencyId: 1,
            commodityIds: [4, 5, 7, 8],
            startDate: new Date('July 30, 1950'),
            endDate: null
        }, {
            name: 'LME',
            locationId: 3,
            currencyId: 4,
            commodityIds: [9],
            startDate: new Date('July 30, 2001'),
            endDate: null
        }, {
            name: 'MCX',
            locationId: 1,
            currencyId: 3,
            commodityIds: [9, 7, 8],
            startDate: new Date('July 30, 2012'),
            endDate: null
        }, {
            name: 'TOCOM',
            locationId: 1,
            currencyId: 2,
            commodityIds: [7, 8, 6],
            startDate: new Date('July 30, 2010'),
            endDate: null
        }];
        
        repository.markets = [];

        _.forEach(markets, function(item) {
            repository.markets.push(new Market(item));
        });
    };
    
    return {
        loadAll: function() {
            loadUsers();
            loadLocations();
            loadCurrencies();
            loadCommodities();
            loadMarkets();
            loadProjects();
            loadBugs();
        }
    };
})();

module.exports = fixtures;