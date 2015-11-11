(function () {
  "use strict";
  var app = angular.module('someApp');
  app.controller('adminController', function($scope, $state, apiService) {
    
    $scope.deleteData = function() {
      $state.loading = true;
      apiService.resetVotes().then(function () {
        $state.loading = false;
        $state.go('vote');
      })
    } 
  });
})();