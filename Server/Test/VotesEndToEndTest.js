// in end to end tests only the happy path is tested.
// unit tests will feature the failing paths.
var request = require('supertest');
var fs = require('fs');

describe("Votes Controller Unit Test", function () {
  var tempStorageFile  = "./tempVotes.json";
  var votes;

  // setup
  beforeEach(function (next) {
    fs.readFile(tempStorageFile, function (err, data){
      if (!err) {fs.unlink(tempStorageFile);}
    // Injection of mocks
      var _storageMock = require('../Modules/PersistanceLayer.js').call({}, tempStorageFile);
      var votesService = require('../Modules/VotesService.js').call({}, _storageMock);
      var votesController = require('../Modules/VotesController.js').call({}, votesService);


      // TODO find out if there is another mock for servers rather than the hand made one.
      express = require('../app').call({},5000, votesController);
      app = express.app;
      server = express.server;
      next();
    });

  });

  // teardown
  afterEach(function (done) {
      // delete file
      fs.readFile(tempStorageFile, function (err, data){
        if (!err) {fs.unlink(tempStorageFile);}
        server.close();
        done();
      });
  });

  it("cast vote, read vote and reset votes", function(done){
    request(app)
      .put('/api/vote')
      .send({gender : 'male'})
      .expect(assertionPut)
      .then(getTest);

      function assertionPut(res) {

        if (res.status != 200) {throw new Error("expected 200, received " + res.status);}
        fs.readFile(tempStorageFile, function (err, data) {
          if (err) {throw new Error("File not created by persistance layer");}
          var votesRead = JSON.parse(data);
          if (votesRead.male != 1 ) {throw new Error("votes not updated in persistance layer - male, expected 1, actual " + data);}
          if (votesRead.female != 0 ) {throw new Error("votes not updated in persistance layer - female");}
        });
      }

      function getTest(){
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