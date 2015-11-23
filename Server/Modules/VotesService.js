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

    storage.Read().then(function (voteHash) {
      if (voteHash == -1) {
          voteHash = getBlank();
      }
      voteHash[gender] = voteHash[gender] + 1;
      storage.Update(voteHash);
      deferred.resolve();    
    }, function (err) {
      deferred.reject(err);
    });

    return deferred.promise;
  }

  function retrieveVotes(){
    var deferred = Promise.defer();

    storage.Read().then(function (result) {
      if (result == -1) {
          result = getBlank();
          storage.Update(result);
      }
      var dto = {};
      dto.male = result.male;
      dto.female = result.female;
      deferred.resolve(dto);
    }, function (err) {
        deferred.reject(err);
    });

    return deferred.promise;
  }

  function resetVotes(){
    var deferred = Promise.defer();

    storage.Update(getBlank()).then( function () {
      deferred.resolve();
    }, function (err) {
      deferred.reject(err);
    });

    return deferred.promise;
  }

  function getBlank(){
      return { male: 0, female: 0  };
  }

}