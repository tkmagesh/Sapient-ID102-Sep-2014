'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    repository = require('./repository.js'),
    fixtures = require('./fixtures.js');

app.use(bodyParser.json());

// cross domain stuff
app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, X-Requested-With');
    if (req.method === 'OPTIONS') {
        res.send(200);
    } else {
        next();
    }
});

// load fixture data
fixtures.loadAll();
// projects
app.get('/api/projects', function(req, res) {
    res.status(200).json({
        projects: repository.projects
    });
});

app.get('/api/projects/:id', function(req, res) {
    var project = repository.getProject(req.params.id);
    res.status(200).json({
        project: project
    });
});

app.get('/api/projects/:id/bugs', function(req, res) {
    console.log(req.params.id);
    var bugs = repository.bugs.filter(function(bug){
        return bug.projectId === parseInt(req.params.id)
    });
    res.status(200).json({
        bugs: bugs
    });
});

app.post('/api/projects', function(req, res) {
    var newProject = repository.createProject(req.body.project);
    
    res.location('/api/projects/' + newProject.id);
    res.status(201).json({
      project: newProject
    });
});

app.put('/api/projects/:id', function(req, res) {
    repository.updateProject(req.params.id, req.body.project);
    
    res.status(204).end();
});

app.delete('/api/projects/:id', function(req, res) {
    repository.deleteProject(req.params.id);
  
    res.status(204).end();
});

// bugs
app.get('/api/bugs', function(req, res) {
    res.status(200).json({
        bugs: repository.bugs
    });
});

app.get('/api/bugs/:id', function(req, res) {
    var bug = repository.getBug(req.params.id);
    res.status(200).json({
        bug: bug
    });
});

app.post('/api/bugs', function(req, res) {
    var newBug = repository.createBug(req.body.bug);
    
    res.location('/api/bugs/' + newBug.id);
    res.status(201).json({
      bug: newBug
    });
});

app.put('/api/bugs/:id', function(req, res) {
    repository.updateBug(req.params.id, req.body.bug);
    
    res.status(204).end();
});

app.delete('/api/bugs/:id', function(req, res) {
    repository.deleteBug(req.params.id);
  
    res.status(204).end();
});



// users
app.get('/api/users', function(req, res) {
    res.status(200).json({
        users: repository.users
    });
});

app.get('/api/users/:id', function(req, res) {
    var user = repository.getUser(req.params.id);
    res.status(200).json({
        user: user
    });
});

app.post('/api/users', function(req, res) {
    var newUser = repository.createUser(req.body.user);
    
    res.location('/api/users/' + newUser.id);
    res.status(201).json({
      user: newUser
    });
});

app.put('/api/users/:id', function(req, res) {
    repository.updateUser(req.params.id, req.body.user);
    
    res.status(204).end();
});

app.delete('/api/users/:id', function(req, res) {
    repository.deleteUser(req.params.id);
  
    res.status(204).end();
});

// locations
app.get('/api/locations', function(req, res) {
    res.status(200).json({
        locations: repository.locations
    });
});

app.get('/api/locations/:id', function(req, res) {
    var location = repository.getLocation(req.params.id);
    res.status(200).json({
        location: location
    });
});

app.post('/api/locations', function(req, res) {
    var newLocation = repository.createLocation(req.body.location);
    
    res.location('/api/locations/' + newLocation.id);
    res.status(201).json({
      location: newLocation
    });
});

app.put('/api/locations/:id', function(req, res) {
    repository.updateLocation(req.params.id, req.body.location);
    
    res.status(204).end();
});

app.delete('/api/locations/:id', function(req, res) {
    repository.deleteLocation(req.params.id);
  
    res.status(204).end();
});

// currencies
app.get('/api/currencies', function(req, res) {
    res.status(200).json({
        currencies: repository.currencies
    });
});

app.get('/api/currencies/:id', function(req, res) {
    var currency = repository.getCurrency(req.params.id);
    res.status(200).json({
        currency: currency
    });
});

app.post('/api/currencies', function(req, res) {
    var newCurrency = repository.createCurrency(req.body.currency);
    
    res.location('/api/currencies/' + newCurrency.id);
    res.status(201).json({
        currency: newCurrency
    });
});

app.put('/api/currencies/:id', function(req, res) {
    repository.updateCurrency(req.params.id, req.body.currency);
    
    res.status(204).end();
});

app.delete('/api/currencies/:id', function(req, res) {
    repository.deleteCurrency(req.params.id);
  
    res.status(204).end();
});

// commodities
app.get('/api/commodities', function(req, res) {
    res.status(200).json({
        commodities: repository.commodities
    });
});

app.get('/api/commodities/:id', function(req, res) {
    var commodity = repository.getCommodity(req.params.id);
    res.status(200).json({
        commodity: commodity
    });
});

app.post('/api/commodities', function(req, res) {
    var newCommodity = repository.createCommodity(req.body.commodity);
    
    res.location('/api/commodities/' + newCommodity.id);
    res.status(201).json({
      commodity: newCommodity
    });
});

app.put('/api/commodities/:id', function(req, res) {
    repository.updateCommodity(req.params.id, req.body.commodity);
    
    res.status(204).end();
});

app.delete('/api/commodities/:id', function(req, res) {
    repository.deleteCommodity(req.params.id);
  
    res.status(204).end();
});

// markets
app.get('/api/markets', function(req, res) {
    res.status(200).json({
        markets: repository.markets
    });
});

app.get('/api/markets/:id', function(req, res) {
    var market = repository.getMarket(req.params.id);
    res.status(200).json({
        market: market
    });
});

app.post('/api/markets', function(req, res) {
    var newMarket = repository.createMarket(req.body.market);
    
    res.location('/api/markets/' + newMarket.id);
    res.status(201).json({
      market: newMarket
    });
});

app.put('/api/markets/:id', function(req, res) {
    repository.updateMarket(req.params.id, req.body.market);
    
    res.status(204).end();
});

app.delete('/api/markets/:id', function(req, res) {
    repository.deleteMarket(req.params.id);
  
    res.status(204).end();
});

// all other routes return a 404
app.use(function(req, res){
    res.status(404).send('404 Not Found');
});

// start server
var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});