describe("Votes Business logic test", function(){


  beforeEach( function(next){

    var _sut = require('./Modules/VotesService.js').call({}, persistanceMock);
    next();
  });

  it("adds male votes", function(){

  });

});