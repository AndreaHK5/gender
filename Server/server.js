
// Main dependency injections
var votesPath = "./Storage/votes.json";
var storage = require('./Modules/Storage.js').call({}, votesPath);
var votesController = require('./Modules/VotesController.js').call({}, storage);

// start app with dependency injection
require('./app.js').call({}, 3000, votesController);


//TODO:
// Include Persistance layer to MongoLab ILO file system
// TODO manual mocks, for the time being. Must find a package like Moq for node
// Split Controller from business logic for better unit testability
// find better package for assertions
// End to end test.

