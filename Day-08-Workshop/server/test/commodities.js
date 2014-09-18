'use strict';

var supertest = require('supertest'),
    api = supertest('http://localhost:3000'),
    fixtures = require('../fixtures.js'),
    commodityId;

// helper to create a commodity
var createCommodity = function(params, done) {
    api
        .post('/api/commodities')
        .set('Content-Type', 'application/json')
        .send({
            commodity: {
                name: params.name,
                class: params.class,
                startDate: params.startDate,
                endDate: params.endDate,
            }
        })
        .expect(201)
        .expect(function(res) {
            if (res.body.commodity.name !== 'Rice') {
                throw new Error('new commodity has wrong name');
            }
        })
        .end(function(err, res) {
            commodityId = res.body.commodity.id;
            done();
        });
};

// helper to delete a commodity
var deleteCommodity = function(id, done) {
    api
        .del('/api/commodities/' + id)
        .expect(204, done);
};

describe('GET /api/commodities', function() {
    beforeEach(function() {
        fixtures.loadAll();
    });
    
    it('respond with the initial commodities in json format', function(done) {
        api
            .get('/api/commodities')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                if (res.body.commodities.length !== 10) {
                    throw new Error('wrong number of commodities');
                }
            })
            .expect(200, done);
    });
});

describe('PUT /api/commodities/:id', function() {
    beforeEach(function(done) {
        fixtures.loadAll();
        
        createCommodity({
            name: 'Rice',
            class: 'Agricultural',
            startDate: new Date('July 30, 2013'),
            endDate: new Date('July 30, 2014')
        }, done);
    });
    
    it('updates a commodity', function(done) {
        api
            .put('/api/commodities/' + commodityId)
            .set('Content-Type', 'application/json')
            .send({
                commodity: {
                    name: 'Rye'
                }
            })
            .expect(204, done);
    });
    
    afterEach(function(done) {
        deleteCommodity(commodityId, done);
    });
});