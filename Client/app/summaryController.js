(function () {
  "use strict";
  var app = angular.module('someApp');
  app.controller('summaryController', function($scope, apiService) {
    apiService.getVotes().then(function(data){
      $scope.votes = data;
      console.log(data);
    });
  });
})();