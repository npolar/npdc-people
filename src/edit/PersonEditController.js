'use strict';

/**
 * @ngInject
 */
var PersonEditController = function ($scope, $controller, $routeParams, Person) {

  // EditController -> NpolarEditController
  $controller('NpolarEditController', { $scope: $scope });

  // Expedition -> npolarApiResource -> ngResource
  $scope.resource = Person;

  // Formula ($scope.formula is set by parent)
  $scope.formula.schema = '//api.npolar.no/schema/person-1';
  $scope.formula.form = 'edit/person-formula.json';
  $scope.formula.template = 'material';

  // edit (or new) action
  $scope.edit();

};

module.exports = PersonEditController;
