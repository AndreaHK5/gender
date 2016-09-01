(function () {
    var module = angular.module("someApp");
    module.factory("apiService", function ($http) {

        var getVotes = function () {
            return $http.get("http://andreagenderbackend.azurewebsites.net/api/votes")
                      .then(function (response) {
                          return response.data;
                      });
        };

        var putVote = function(vote) {
              var data = {};
              data.gender = vote;
              return $http.put("http://andreagenderbackend.azurewebsites.net/api/vote", data)
                .then(function (response) {
                    return response.data;
                });
        };

        var resetVotes = function() {
              return $http.post("http://andreagenderbackend.azurewebsites.net/api/resetvote")
                .then(function (response) {
                    return response.data;
                });
        };

        return {
            getVotes: getVotes,
            putVote: putVote,
            resetVotes: resetVotes
        };
    });

}());