
// Main dependency injections
var votesPath = "./Storage/votes.json";
var storage = require('./Modules/Storage.js').call({}, votesPath);
var votesController = require('./Modules/VotesController.js').call({}, storage);

// start app with dependency injection
require('./app.js').call({}, 3000, votesController);


//TODO:
// Unit test for API Controller
// Include Persistance layer to MongoLab ILO file system
// Split Controller from business logic for better unit testability
// End to end test.

