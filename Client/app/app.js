(function() {
   "use strict";

   var app = angular.module('someApp', ['ui.router','ui.bootstrap']);

   app.config(function($stateProvider, $urlRouterProvider) {
  
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('vote', {
        url: "/",
        controller: 'voteController',
        templateUrl: "partials/vote.html"
      })
      .state('summary', {
        url: "/summary",
        templateUrl: "partials/summary.html",
        controller: 'summaryController'
      });
     });
})();
