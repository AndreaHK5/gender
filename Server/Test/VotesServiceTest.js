var assert = require('assert');

describe("Votes Business logic test", function(){

  function init(votes){
      var _storageMock = {
        votes : votes,
        Update : function(newObj) { this.votes = newObj},
        Read : function(){ return this.votes},
      };    
      return require('../Modules/VotesService.js').call({}, _storageMock);
  };


  it("adds male votes", function(){
    var votes = { male:0, female:0 };
    var _sut = init(votes);
    _sut.addVote("male");
    assert.equal(votes.male, 1);
    assert.equal(votes.female, 0);     
  });

  it("adds female votes", function(){
    var votes = { male:0, female:0 };
    var _sut = init(votes);

    _sut.addVote("female");
    assert.equal(votes.female, 1);     
    assert.equal(votes.male, 0);     
  });

});