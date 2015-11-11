(function () {
  "use strict";
  var app = angular.module('someApp');
  app.controller('summaryController', function($scope, $state, apiService) {
    $scope.loading = true;
    
    apiService.getVotes().then(function(data){
      $scope.loading = false;
        $scope.percentages = {};
        if (data.male == 0 && data.female == 0){
            $scope.percentages.male = 0;
            $scope.percentages.female = 0;
        } else {
            $scope.percentages.female = data.female / (data.male + data.female) * 100;
            $scope.percentages.male = data.male / (data.male + data.female) * 100;
        }
    });

    $scope.vote = function(gender) {
      apiService.putVote(gender).then(function () {
        $state.go($state.current, {}, {reload: true});
      })
    }

  });
})();