var request = require('supertest');

describe("Votes Controller Unit Test", function () {
  
  // Injection of mocks
  // TODO manual mocks, for the time being. Must find a package like Moq for node 
  var votes = {"male":0,"female":4};
  var _storageMock = {
      Update : function(){},
      Read : function(){ return votes},
  }

  // instantiation of system under test
  var _sut = require("../Modules/VotesController").call({},_storageMock);
  // spin up mock server for testing 

  it("can get votes", function(done){
    var app = require('../app').call({},5000, _sut);
    request(app)
      .get('/api/votes')
      .set('Accept', 'application/json')
      .expect(200, votes)
      .end(function(err, res){
        if (err) return done(err);
        done();
      });
  })

});