'use strict';

var supertest = require('supertest'),
    api = supertest('http://localhost:3000'),
    fixtures = require('../fixtures.js'),
    marketId;

// helper to create a market
var createMarket = function(params, done) {
    api
        .post('/api/markets')
        .set('Content-Type', 'application/json')
        .send({
            market: {
                name: params.name,
                locationId: params.locationId,
                currencyId: params.currencyId,
                commodityIds: params.commodityIds
            }
        })
        .end(function(err, res) {
            marketId = res.body.market.id;
            done();
        });
};

// helper to delete a market
var deleteMarket = function(id, done) {
    api
        .del('/api/markets/' + id)
        .expect(204, done);
};

describe('GET /api/markets', function() {
    beforeEach(function() {
        fixtures.loadAll();
    });
    
    it('respond with the initial markets in json format', function(done) {
        api
            .get('/api/markets')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                if (res.body.markets.length !== 7) {
                    throw new Error('wrong number of markets');
                }
            })
            .expect(200, done);
    });
});

describe('PUT /api/markets/:id', function() {
    beforeEach(function(done) {
        fixtures.loadAll();
        
        createMarket({
            name: 'Test Market',
            locationId: 1,
            currencyId: 1,
            commodityIds: [1, 2, 3]
        }, done);
    });
    
    it('updates a market', function(done) {
        api
            .put('/api/markets/' + marketId)
            .set('Content-Type', 'application/json')
            .send({
                market: {
                    name: 'Another Test Market'
                }
            })
            .expect(204, done);
    });
    
    afterEach(function(done) {
        deleteMarket(marketId, done);
    });
});