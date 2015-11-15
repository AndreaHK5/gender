var request = require('supertest');

describe("Votes Controller Unit Test", function () {

  var votes;
  var _storageMock;
  // setup 
  beforeEach(function (next) {

  // Injection of mocks 
    votes = { male:0,female:4 };
    _storageMock = {
      votes : votes,
      Update : function(newObj) { this.votes = newObj},
      Read : function(){ return this.votes},
    }

    // instantiation of system under test
    var _sut = require("../Modules/VotesController").call({},_storageMock);

    // TODO find out if there is another mock for servers rather than the hand made one.
    express = require('../app').call({},5000, _sut);
    app = express.app;
    server = express.server;
    next();
  })

  // teardown
  afterEach(function () {
      server.close();    
  });

  it("can get votes", function(done){
    request(app)
      .get('/api/votes')
      .set('Accept', 'application/json')
      .expect(200, votes)
      .end(done);
  })

  it("rejects votes with no gender", function(done){
    request(app)
      .put('/api/vote')
      .field('someKey', 'some Mock Gendere Here')
      .expect(assertion)
      .end(done);

      function assertion(res) {
        if (res.status != 200) throw new Error("expected 200, received " + res.status);
        if (! ("error" in res.body)) throw new Error ("No error message is returned" + res.text);
      }
  })

  it("rejects votes with malformed gender", function(done){
    request(app)
      .put('/api/vote')
      .field('gender', 'some Mock Gendere Here')
      .expect(assertion)
      .end(done);

      function assertion(res) {
        if (res.status != 200) throw new Error("expected 200, received " + res.status);
        if (! ("error" in res.body)) throw new Error ("No error message is returned" + res.text);
      }
  })

  it("accepts votes for males", function(done){
    request(app)
      .put('/api/vote')
      .send({'gender' : 'male'})
      .expect(assertion)
      .end(done);

      function assertion(res) {
        var updatedVotes = _storageMock.Read(); 
        if (res.status != 200) throw new Error("Expected 200, received " + res.status);
        if ("error" in res.body) throw new Error ("Error message should not be provided" + res.text);
        if (updatedVotes.male != 1) throw new Error ("Genders not updated");
      }
  })


  it("accepts votes for females", function(done){
    request(app)
      .put('/api/vote')
      .send({'gender' : 'female'})
      .expect(assertion)
      .end(done);

      function assertion(res) {
        var updatedVotes = _storageMock.Read(); 
        if (res.status != 200) throw new Error("Expected 200, received " + res.status);
        if ("error" in res.body) throw new Error ("Error message should not be provided" + res.text);
        if (updatedVotes.female != 5) throw new Error ("Genders not updated");
      }
  })

  it("can reset votes", function(done){
    request(app)
      .post('/api/resetvote')
      .expect(assertion)
      .end(done);

      function assertion(res) {
        var updatedVotes = _storageMock.Read(); 
        if (res.status != 200) throw new Error("Expected 200, received " + res.status);
        if (!("message" in res.body)) throw new Error ("message should not be provided" + res.text);
        if (updatedVotes.male != 0 || updatedVotes.female != 0) throw new Error ("Genders not reset " + JSON.stringify(updatedVotes));
      }
  })

});