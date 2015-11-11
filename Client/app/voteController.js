(function () {
  "use strict";
  var app = angular.module('someApp');
  app.controller('voteController', function($scope, $state, apiService) {
    $scope.vote = function(gender) {
      apiService.putVote(gender).then(function () {
        $state.go('summary');
      })
    } 
  });
})();