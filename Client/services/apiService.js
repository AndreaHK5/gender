(function () {

    var apiService = function ($http) {

        var getVotes = function () {
            return $http.get("http://genderbackend.azurewebsites.net/api/votes")
                      .then(function (response) {
                          return response.data;
                      });
        };

        var putVote = function(vote) {
          console.log("send vote for " + vote);

        };
        return {
            getVotes: getVotes,
            putVote: putVote
        };
    };

    var module = angular.module("someApp");
    module.factory("apiService", apiService);

}());