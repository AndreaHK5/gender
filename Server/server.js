var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var votesPath = "./Storage/votes.json";
var storage = require('./Modules/Storage.js').call({}, votesPath);

// IoC for api
var votesController = require('./Modules/VotesController.js').call({}, storage);

var app = express();
var port = process.env.PORT || 3000;

var jsonParser = bodyParser.json({type: 'application/*+json'});

app
    .use(cors())
    .use(jsonParser)
    .use(bodyParser.json())
    .listen(port);

app.put('/api/vote', votesController.PutVote);
app.get('/api/votes', votesController.GetVotes);
app.post('/api/resetvote', votesController.ResetVotes);


//TODO:
// Unit test for API Controller
// Include Persistance layer to MongoLab ILO file system
// Split Controller from business logic for better unit testability

