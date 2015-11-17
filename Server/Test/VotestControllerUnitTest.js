var request = require('supertest');

describe("Votes Controller Unit Test", function () {

  var votes;
  var _storageMock;
  // setup 
  beforeEach(function (next) {

    // Injection of mocks 
    var votes = {male : 0, female:1};
    var _voteServiceMock = { 
      addVote: function () { return Promise.defer().resolve(); },
      retrieveVotes: function () { 
        var deferred = Promise.defer();
        setTimeout(function (){
          deferred.resolve(votes);
        },500);
        return deferred.promise; 
      },
      resetVotes: function () {}
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

  it("can get votes", function(done){
    request(app)
      .get('/api/votes')
      .set('Accept', 'application/json')
      .expect(assertion)
      .end(done);

      function assertion(res){
        if (res.status != 200) throw new Error("expected 200, received " + res.status);
        if (res.body != votes) throw new Error("votes not received " + JSON.stringify(res.body));
      }
  })

  // it("rejects votes with no gender", function(done){
  //   request(app)
  //     .put('/api/vote')
  //     .send({'someKey' : 'someMockGender'})
  //     .expect(assertion)
  //     .end(done);

  //     function assertion(res) {
  //       if (res.status != 200) throw new Error("expected 200, received " + res.status);
  //       if (! ("error" in res.body)) throw new Error ("No error message is returned" + res.text);
  //     }
  // })

  // it("rejects votes with malformed gender", function(done){
  //   request(app)
  //     .put('/api/vote')
  //     .send({'gender' : 'someMockGender'})
  //     .expect(assertion)
  //     .end(done);

  //     function assertion(res) {
  //       if (res.status != 200) throw new Error("expected 200, received " + res.status);
  //       if (! ("error" in res.body)) throw new Error ("No error message is returned" + res.text);
  //     }
  // })

  // it("accepts votes for males", function(done){
  //   request(app)
  //     .put('/api/vote')
  //     .send({'gender' : 'male'})
  //     .expect(assertion)
  //     .end(done);

  //     function assertion(res) { 
  //       if (res.status != 200) throw new Error("Expected 200, received " + res.status);
  //       if ("error" in res.body) throw new Error ("Error message should not be provided" + res.text);
  //     }
  // })


  // it("accepts votes for females", function(done){
  //   request(app)
  //     .put('/api/vote')
  //     .send({'gender' : 'female'})
  //     .expect(assertion)
  //     .end(done);

  //     function assertion(res) {
  //       if (res.status != 200) throw new Error("Expected 200, received " + res.status);
  //       if ("error" in res.body) throw new Error ("Error message should not be provided" + res.text);
  //     }
  // })

  // it("can reset votes", function(done){
  //   request(app)
  //     .post('/api/resetvote')
  //     .expect(assertion)
  //     .end(done);

  //     function assertion(res) {
  //       if (res.status != 200) throw new Error("Expected 200, received " + res.status);
  //       if (!("message" in res.body)) throw new Error ("message should not be provided" + res.text);
  //     }
  // })

});