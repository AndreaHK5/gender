(function() {
   "use strict";

   var app = angular.module('someApp', ['ui.router','ui.bootstrap']);

   app.config(function($stateProvider, $urlRouterProvider) {
  
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('vote', {
        url: "/",
        views : {
          content : {
            controller: 'voteController',
            templateUrl: "partials/vote.html"            
          },
          nav : {
            templateUrl: "partials/navbar.html"
          }
        }
      })
      .state('summary', {
        url: "/summary",
        views : {
          content : {
            controller: 'summaryController',
            templateUrl: "partials/summary.html"           
          },
          nav : {
            templateUrl: "partials/navbar.html"
          }
        }
      });
     });
})();
