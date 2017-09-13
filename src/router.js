'use strict';

// @ngInject

var router = function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true).hashPrefix('!');

  $routeProvider.when('/:id', {
    templateUrl: 'show/show.html',
    controller: 'PersonShowController'
  }).when('/:id/edit', {
    template: `<npdc:formula></npdc:formula>
    <md-checkbox ng-model="is_employed" ng-disabled="true" aria-label="Employed?">
      Employed now ?
    </md-checkbox>`,
    controller: 'PersonEditController'
  }).when('/', {
    template: '<npdc:search-input feed="feed"></npdc:search-input><npdc:search feed="feed"></npdc:search>',
    controller: 'PersonSearchController',
    reloadOnSearch: false
  });
};

module.exports = router;
