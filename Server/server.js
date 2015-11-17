
// Main dependency injections
var votesPath = "./Storage/votes.json";
var persistanceLayer = require('./Modules/PersistanceLayer.js').call({}, votesPath);
var votesController = require('./Modules/VotesController.js').call({}, persistanceLayer);

// start app with dependency injection
require('./app.js').call({}, 3000, votesController);


