(function () {
  'use strict';

  var app = angular.module('app');

  // get all the routes
  app.constant('routes', getRoutes());

  // config routes & their resolvers
  app.config(['$routeProvider', 'routes', routeConfigurator]);

  function routeConfigurator($routeProvider, routes) {
    routes.forEach(function (route) {
      $routeProvider.when(route.url, route.config);
    });

    $routeProvider.otherwise({ redirectTo: '/LearningPaths' });
  }

  // build the routes
  function getRoutes() {
    return [
      {
        url: '/LearningPaths',
        config: {
          templateUrl: '../app/learningPath/learningPaths.html',
          title: 'learning paths',
          settings: {
            nav: 1,
            content: 'learning paths'
          }
        }
      },
      {
        url: '/LearningItems',
        config: {
          templateUrl: '../app/learningItem/learningItems.html',
          title: 'learning items',
          settings: {
            nav: 2,
            content: 'learning items'
          }
        }
      }

    ];
  }
})();