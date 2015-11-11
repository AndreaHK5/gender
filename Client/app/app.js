(function() {
   "use strict";

   var app = angular.module('someApp', ['ui.router','ui.bootstrap']);

   app.config(function($stateProvider, $urlRouterProvider) {
  
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('vote', {
        url: "/",
        controller: 'voteController',
        templateUrl: "Client/partials/vote.html"
      })
      .state('summary', {
        url: "/summary",
        templateUrl: "Client/partials/summary.html",
        controller: 'summaryController'
      });
     });
})();
