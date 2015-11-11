(function () {
  "use strict";
  var app = angular.module('someApp');
  app.controller('voteController', function($scope, apiService) {
    $scope.vote = function(gender) {
      console.log(gender);
    } 
  });
})();