(function () {

    var apiService = function ($http) {

        var getVotes = function () {
            return $http.get("http://genderbackend.azurewebsites.net/api/votes")
                      .then(function (response) {
                          return response.data;
                      });
        };

        var putVote = function(vote) {
              var data = {};
              data.gender = vote;
              return $http.put("http://genderbackend.azurewebsites.net/api/vote", data)
                .then(function (response) {
                    return response.data;
                });

        };
        return {
            getVotes: getVotes,
            putVote: putVote
        };
    };

    var module = angular.module("someApp");
    module.factory("apiService", apiService);

}());