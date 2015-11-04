'use strict';

// @ngInject

var router = function ($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true).hashPrefix('!');

  $routeProvider.when('/:id', {
    templateUrl: 'show/show.html',
    controller: 'PeopleShowController'
  }).when('/:id/edit', {
    template: '<npdc:formula></npdc:formula>',
    controller: 'PeopleEditController'
  }).when('/', {
    template: '<npdc:search-input feed="feed"></npdc:search-input><npdc:search feed="feed"></npdc:search>',
    controller: 'PeopleSearchController',
    reloadOnSearch: false
  });
};

module.exports = router;
