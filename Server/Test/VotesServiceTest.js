var assert = require('assert');

describe("Votes Business logic test", function(){

  var init = function (votes){
     var _storageMock = {
       localvotes : votes,
       Update : function(newObj) { this.localvotes = newObj;},
       Read : function(){ return this.localvotes;}
     };    
     return require('../Modules/VotesService.js').call({}, _storageMock);
  };

  // var initWithEmptyRepo = function (votes){
  //   var _storageMock = {
  //     votes : votes,
  //     Update : function(newObj) { console.log("update"); this.votes = newObj;},
  //     Read : function(){ return -1; }
  //   };    
  //   return require('../Modules/VotesService.js').call({}, _storageMock);
  // };

  // reserch into name collision / scope collision / known issues for async testing for mocha

  // it("adds male votes same scope if repo not set", function (done) {
  //   var votes = { };
  //   var _sut = initWithEmptyRepo(votes);
  //   _sut.addVote("male").then(function (){
  //     console.log("this runs " + JSON.stringify(votes));
  //     console.log("this does not run");

  //     done();       
  //   });
  // }); 

  // it("gets scope if repo not set", function (done) {
  //   var votes = { };
  //   var _sut = init(votes);
  //   _sut.retrieveVotes().then(function (result){
  //     assert.equal(result,1);

  //     done();       
  //   });
  // }); 

  it("adds male votes", function (done){
    var votes = { male:1, female:1 };
    var _sut = init(votes);
    _sut.addVote("male").then(function (result){
      assert.equal(votes.male, 2);
      assert.equal(votes.female, 1);
      done();       
    });
  });


  it("adds female votes", function (done){
    var votes = { male:3, female:3 };
    var _sut = init(votes);
    _sut.addVote("female").then(function(){
      assert.equal(votes.female, 4);     
      assert.equal(votes.male, 3); 
      done();      
    });
  });

  it("retrieves votes", function (done){
    var votes = { male:1, female:1 };
    var _sut = init(votes);  
    _sut.retrieveVotes().then(function (res) {
        assert.equal(res,votes);
        done();
    }); 
  });

  it("resets votes", function (done){
    var votes = { male:1, female:1 };
    var _sut = init(votes);  
    _sut.resetVotes().then(function () {
        throw new Error("I can throw");
        done();
    }); 
  });

});