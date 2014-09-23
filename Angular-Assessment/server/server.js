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
    res.status(200).json(repository.projects);
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
    res.status(200).json(bugs);
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

app.post('/api/projects/:projectId/bugs', function(req, res) {
    var newBug = repository.createBug(req.body);
    
    res.location('/api/bugs/' + newBug.id);
    res.status(201).json({
      bug: newBug
    });
});

app.put('/api/projects/:projectId/bugs/:id', function(req, res) {
    repository.updateBug(req.params.id, req.body);
    
    res.status(204).end();
});

app.delete('/api/bugs/:id', function(req, res) {
    repository.deleteBug(req.params.id);
  
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