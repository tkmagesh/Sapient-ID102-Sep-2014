'use strict';

var supertest = require('supertest'),
    api = supertest('http://localhost:3000'),
    fixtures = require('../fixtures.js'),
    currencyId;

// helper to create a currency
var createCurrency = function(params, done) {
    api
        .post('/api/currencies')
        .set('Content-Type', 'application/json')
        .send({
            currency: {
                name: params.name,
                description: params.description
            }
        })
        .expect(201)
        .expect(function(res) {
            if (res.body.currency.name !== params.name) {
                throw new Error('new currency has wrong name');
            }
        })
        .end(function(err, res) {
            currencyId = res.body.currency.id;
            done();
        });
};

// helper to delete a currency
var deleteCurrency = function(id, done) {
    api
        .del('/api/currencies/' + id)
        .expect(204, done);
};

describe('GET /api/currencies', function() {
    beforeEach(function() {
        fixtures.loadAll();
    });
    
    it('respond with the initial currencies in json format', function(done) {
        api
            .get('/api/currencies')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                if (res.body.currencies.length !== 5) {
                    throw new Error('wrong number of currencies');
                }
            })
            .expect(200, done);
    });
});

describe('PUT /api/currencies/:id', function() {
    beforeEach(function(done) {
        fixtures.loadAll();

        createCurrency({
            name: 'CAD',
            description: 'Canadian dollar'
        }, done);
    });

    it('updates a currency', function(done) {
        api
            .put('/api/currencies/1')
            .set('Content-Type', 'application/json')
            .send({
                currency: {
                    name: 'MXN'
                }
            })
            .expect(204, done);
    });

    afterEach(function(done) {
        deleteCurrency(currencyId, done);
    });
});