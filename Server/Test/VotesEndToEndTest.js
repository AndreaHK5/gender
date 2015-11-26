// in end to end tests only the happy path is tested.
// unit tests will feature the failing paths.
var request = require("supertest-as-promised");
var mongodb = require('mongodb');

describe("Votes Controller Unit Test", function () {
  var tempDb  = 'mongodb://dbuser:gender@ds059524.mongolab.com:59524/genderdbtest';

  // setup
  beforeEach(function (next) {
    // Injection of mocks
    var _storageMock = require('../Modules/PersistanceMongo.js').call({}, tempDb);
    var votesService = require('../Modules/VotesService.js').call({}, _storageMock);
    var votesController = require('../Modules/VotesController.js').call({}, votesService);    
    // TODO find out if there is another mock for servers rather than the hand made one.
    express = require('../app').call({},5000, votesController);
    app = express.app;
    server = express.server;
    // delete previous try
    var MongoClient = mongodb.MongoClient;    
    MongoClient.connect(tempDb, function (err, db) {
      if (err) {
        console.log(err);
        throw new Error ("cannot connect to mongo db server");
        process.exit(1);
      }
      var votesCollection = db.collection("votes");
      votesCollection.update({title : "Votes Registry"},{male: 0, female : 0 }, { upsert: true })
        .then(function (err) {
          // handle error
          next();
       });
    });     
  });

  // teardown
  // afterEach(function (done) {
      // delete file
      // fs.readFile(tempStorageFile, function (err, data){
      //   if (!err) {fs.unlink(tempStorageFile);}
      //   server.close();
      //   done();
      // });
  // });

  it("cast vote, read vote and reset votes", function(done){
    request(app)
      .put('/api/vote')
      .send({gender : 'male'})
      .expect(assertionPut)
      .then(getTest)
      .catch(function (err) { console.log(err) });

      function assertionPut(res) {
        if (res.status != 200) {throw new Error("expected 200, received " + res.status);}
      }
      function getTest(res) {
        request(app)
          .get('/api/votes')
          .set('Accept', 'application/json')
          .expect(200, { male : 1, female : 0})
          .end(function(err, res){
            if (err) { return done(err);}
            done();
          });        
      }
  })
});