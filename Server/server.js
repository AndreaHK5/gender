
// Main dependency injections
var votesPath = "./Storage/votes.json";
var persistanceLayer = require('./Modules/PersistanceLayer.js').call({}, votesPath);
var votesController = require('./Modules/VotesController.js').call({}, persistanceLayer);

// start app with dependency injection
require('./app.js').call({}, 3000, votesController);


//TODO:
// Include End to End test on temp vote file
// Include Persistance layer to MongoLab ILO file system for vote file
// Include storage of all votes (with time stamps)
// change naming convetion for app and server
// manual mocks, for the time being. Must find a package like Moq for node
// Split Controller from business logic for better unit testability
// find better package for assertions
// End to end test.

