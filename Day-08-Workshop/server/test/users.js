'use strict';

var supertest = require('supertest'),
    api = supertest('http://localhost:3000'),
    fixtures = require('../fixtures.js'),
    userId;

// helper to create a user
var createUser = function(params, done) {
    api
        .post('/api/users')
        .set('Content-Type', 'application/json')
        .send({
            user: {
                username: params.username,
                password: params.password,
                role: params.role
            }
        })
        .expect(201)
        .expect(function(res) {
            if (res.body.user.username !== 'user4') {
                throw new Error('new user has wrong name');
            }
        })
        .end(function(err, res) {
            userId = res.body.user.id;
            done();
        });
};

// helper to delete a user
var deleteUser = function(id, done) {
    api
        .del('/api/users/' + id)
        .expect(204, done);
};

describe('GET /api/users', function() {
    beforeEach(function() {
        fixtures.loadAll();
    });
    
    it('respond with the initial users in json format', function(done) {
        api
            .get('/api/users')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res) {
                if (res.body.users.length !== 3) {
                    throw new Error('wrong number of users');
                }
            })
            .expect(200, done);
    });
});

describe('PUT /api/users/:id', function() {
    beforeEach(function(done) {
        fixtures.loadAll();

        createUser({
            username: 'user4',
            password: 'test111',
            role: 'business'
        }, done);
    });

    it('updates a user', function(done) {
        api
            .put('/api/users/1')
            .set('Content-Type', 'application/json')
            .send({
                user: {
                    username: 'user5'
                }
            })
            .expect(204, done);
    });

    afterEach(function(done) {
        deleteUser(userId, done);
    });
});