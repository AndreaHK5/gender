module.exports = Start;

function Start(address, votesController) {
  'use strict';

  var express = require('express');
  var bodyParser = require('body-parser');
  var cors = require('cors');
  var app = express();
  var port = process.env.PORT || address || 3000;
  var jsonParser = bodyParser.json({type: 'application/*+json'}); 

  var server = app
      .use(cors())
      .use(jsonParser)
      .use(bodyParser.json())
      .listen(port);  

  app.put('/api/vote', votesController.PutVote);
  app.get('/api/votes', votesController.GetVotes);
  app.post('/api/resetvote', votesController.ResetVotes);

  // The server is returned in order to ensure turn off (for tests)
  return {
    app : app,
    server : server
  };
}