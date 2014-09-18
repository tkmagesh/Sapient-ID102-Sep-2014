'use strict';

var supertest = require('supertest'),
    api = supertest('http://localhost:3000'),
    fixtures = require('../fixtures.js'),
    locationId;

// helper to create a location
var createLocation = function(params, done) {
    api
        .post('/api/locations')
        .set('Content-Type', 'application/json')
        .send({
            location: {
                name: params.name,
                description: params.description
            }
        })
        .expect(201)
        .expect(function(res) {
            if (res.body.location.name !== params.name) {
                throw new Error('new location has wrong name');
            }
        })
        .end(function(err, res) {
            locationId = res.body.location.id;
            done();
        });
};

// helper to delete a location
var deleteLocation = function(id, done) {
    api
        .del('/api/locations/' + id)
        .expect(204, done);
};

describe('GET /api/locations', function() {
    beforeEach(function() {
        fixtures.loadAll();
    });
    
    it('respond with the initial locations in json format', function(done) {
        api
            .get('/api/locations')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                if (res.body.locations.length !== 3) {
                    throw new Error('wrong number of locations');
                }
            })
            .expect(200, done);
    });
});

describe('PUT /api/locations/:id', function() {
    beforeEach(function(done) {
        fixtures.loadAll();

        createLocation({
            name: 'Africa',
            description: 'Africa'
        }, done);
    });

    it('updates a location', function(done) {
        api
            .put('/api/locations/1')
            .set('Content-Type', 'application/json')
            .send({
                location: {
                    name: 'Antarctica'
                }
            })
            .expect(204, done);
    });

    afterEach(function(done) {
        deleteLocation(locationId, done);
    });
});