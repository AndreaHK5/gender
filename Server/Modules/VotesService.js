module.exports = createservice;

// Business logic for votes
function createservice(storage) { 
  return {
    addVote: addVote,
    retrieveVotes: retrieveVotes,
    resetVotes: resetVotes 
  }

  function addVote(gender){
    var deferred = Promise.defer();

    var voteHash = storage.Read();
    if (voteHash == -1) {
        voteHash = getBlank();
    }
    voteHash[gender] = voteHash[gender] + 1;
    storage.Update(voteHash);
    setTimeout(function(){
      deferred.resolve();
    },500);
    return deferred.promise;
  }

  function retrieveVotes(){
    var deferred = Promise.defer();

    setTimeout(function (){
      var result = storage.Read();
      if (result == -1) {
          result = getBlank();
          storage.Update(result);
      }
      deferred.resolve(result);
    },500);

    return deferred.promise;
  }

  function resetVotes(){
    var deferred = Promise.defer();

    setTimeout(function(){
      storage.Update(getBlank());
      deferred.resolve();
    },500);

    return deferred.promise;
  }

  function getBlank(){
      return { male: 0, female: 0  };
  }

}