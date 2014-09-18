'use strict';

var _ = require('lodash'),
    User = require('./domain/User.js'),
    Commodity = require('./domain/Commodity.js'),
    Market = require('./domain/Market.js'),
    Location = require('./domain/Location.js'),
    Currency = require('./domain/Currency.js');

var repository = (function() {
    var repo = {
        users: [],
        
        createUser: function(params) {
            var user = new User(params);
        
            repo.users.push(user);
        
            return user;
        },
        
        updateUser: function(id, params) {
            var user = _.find(repo.users, { 'id': parseInt(id) });
        
            // don't update primary key
            delete params.id;
        
            _.forIn(params, function(value, key) {
                user[key] = value;
            });
        
            return user;
        },

        getUser: function(id) {
            var location = _.find(repo.users, {'id':parseInt(id)});
            return location;

        },
        
        deleteUser: function(id) {
            return _.remove(repo.users, { 'id': parseInt(id) });
        },
        
        locations: [],
        
        createLocation: function(params) {
            var location = new Location(params);
        
            repo.locations.push(location);
        
            return location;
        },
        
        updateLocation: function(id, params) {
            var location = _.find(repo.locations, { 'id': parseInt(id) });
        
            // don't update primary key
            delete params.id;
        
            _.forIn(params, function(value, key) {
                location[key] = value;
            });
        
            return location;
        },
        
        getLocation: function(id) {
            var location = _.find(repo.locations, { 'id': parseInt(id) });
            return location;
        },

        deleteLocation: function(id) {
            return _.remove(repo.locations, { 'id': parseInt(id) });
        },
        
        currencies: [],
        
        createCurrency: function(params) {
            var currency = new Currency(params);
        
            repo.currencies.push(currency);
        
            return currency;
        },

        getCurrency: function(id) {
            var currency = _.find(repo.currencies, {'id': parseInt(id) });
            return currency;
        },
        
        updateCurrency: function(id, params) {
            var currency = _.find(repo.currencies, { 'id': parseInt(id) });
        
            // don't update primary key
            delete params.id;
        
            _.forIn(params, function(value, key) {
                currency[key] = value;
            });
        
            return currency;
        },
        
        deleteCurrency: function(id) {
            return _.remove(repo.currencies, { 'id': parseInt(id) });
        },
        
        commodities: [],
        
        createCommodity: function(params) {
            var commodity = new Commodity(params);
        
            repo.commodities.push(commodity);
        
            return commodity;
        },

        getCommodity: function(id) {
            var commodity = _.find(repo.commodities, {'id': parseInt(id) });
            return commodity;
        },
        
        updateCommodity: function(id, params) {
            var commodity = _.find(repo.commodities, { 'id': parseInt(id) });
        
            // don't update primary key
            delete params.id;
        
            _.forIn(params, function(value, key) {
                commodity[key] = value;
            });
        
            return commodity;
        },
        
        deleteCommodity: function(id) {
            return _.remove(repo.commodities, { 'id': parseInt(id) });
        },
        
        markets: [],
        
        createMarket: function(params) {
            var market = new Market(params);
        
            repo.markets.push(market);
        
            return market;
        },

        getMarket: function(id) {
            var market = _.find(repo.markets, {'id': parseInt(id) });
            return market;
        },
        
        updateMarket: function(id, params) {
            var market = _.find(repo.markets, { 'id': parseInt(id) });
        
            // don't update primary key
            delete params.id;
        
            _.forIn(params, function(value, key) {
                market[key] = value;
            });
        
            return market;
        },
        
        deleteMarket: function(id) {
            return _.remove(repo.markets, { 'id': parseInt(id) });
        }
    };
    
    return repo;
})();

module.exports = repository;