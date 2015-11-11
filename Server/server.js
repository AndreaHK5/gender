var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var voteHash = {
    male: 0,
    female: 0
};

var api = require('./Modules/API.js').call({}, voteHash);

var app = express();
var port = process.env.PORT || 3000;

var jsonParser = bodyParser.json({type: 'application/*+json'});

app
    .use(cors())
    .use(jsonParser)
    .use(bodyParser.json())
    .listen(port);

app.put('/api/vote', api.PutVote);
app.get('/api/votes', api.GetVotes)
