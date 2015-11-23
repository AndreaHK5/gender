
// Main dependency injections
// var votesPath = "./Storage/votes.json";
//var persistanceLayer = require('./Modules/PersistanceLayer.js').call({}, votesPath);

var connectionString = 'mongodb://dbuser:gender@ds057254.mongolab.com:57254/genderdb'; 
var persistanceLayer = require('./Modules/PersistanceMongo.js').call({}, connectionString);

var votesService = require('./Modules/VotesService.js').call({}, persistanceLayer);
var votesController = require('./Modules/VotesController.js').call({}, votesService);

// start app with dependency injection

require('./app.js').call({}, 3000, votesController);


//TODO:
// Include Persistance layer to MongoLab ILO file system for vote file
// research into issue regarding assertions in async (not calling callback on success )
// Include storage of all votes (with time stamps)
// change naming convetion for app and server (use Global)
// manual mocks, for the time being. Must find a package like Moq for node
// find better package for assertions
