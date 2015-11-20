var request = require('supertest');

describe("Votes Controller Unit Test", function () {

  // setup 
  var votes = {
    male : 0, 
    female:1
  };

  beforeEach(function (next) {

    // Mock Service Votes
    var _voteServiceMock = { 
      addVote: function () { 
        var deferred = Promise.defer();
        setTimeout(function (){
          deferred.resolve("OK");
        },1);
        return deferred.promise;  
      },
      retrieveVotes: function () { 
        var deferred = Promise.defer();
        setTimeout(function (){
          deferred.resolve(votes);
        },1);
        return deferred.promise; 
      },
      resetVotes: function () {
        var deferred = Promise.defer();
        setTimeout(function (){
          deferred.resolve("OK");
        },1);
        return deferred.promise; 
      }
    }

    // instantiation of system under test
    var _sut = require("../Modules/VotesController").call({},_voteServiceMock);

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

  // Success Response Assertions
  function successAssertions(res) {
     if (res.status != 200) throw new Error("Expected 200, received " + res.status);
     if ("error" in res.body) throw new Error ("error should not be provided" + res.text);
     if (!("message" in res.body)) throw new Error ("message should be provided" + res.text);    
  }

  // Validation Errors Assertions
  function errorAssertions(res) {
    if (res.status != 200) throw new Error("expected 200, received " + res.status);
    if (! ("error" in res.body)) throw new Error ("No error message is returned" + res.text);
  }

  it("can get votes", function(done){
    request(app)
      .get('/api/votes')
      .set('Accept', 'application/json')
      .expect(assertion)
      .end(done);

      function assertion(res){
        if (res.status != 200) throw new Error("expected 200, received " + res.status);
        if (res.body.male != votes.male && res.body.female != votes.female) throw new Error("votes canot be retrieved ");
      }
  })

  it("rejects votes with no gender", function(done){
    request(app)
      .put('/api/vote')
      .send({'someKey' : 'someMockGender'})
      .expect(errorAssertions)
      .end(done);
  })

  it("rejects votes with malformed gender", function(done){
    request(app)
      .put('/api/vote')
      .send({'gender' : 'someMockGender'})
      .expect(errorAssertions)
      .end(done);
  })

  it("accepts votes for males", function(done){
    request(app)
      .put('/api/vote')
      .send({'gender' : 'male'})
      .expect(successAssertions)
      .end(done);
  })

  it("accepts votes for females", function(done){
    request(app)
      .put('/api/vote')
      .send({'gender' : 'female'})
      .expect(successAssertions)
      .end(done);
  })

  it("can reset votes", function(done){
    request(app)
      .post('/api/resetvote')
      .expect(successAssertions)
      .end(done);
  })

});