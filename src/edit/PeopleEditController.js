'use strict';

/**
 * @ngInject
 */
var PeopleEditController = function ($scope, $controller, $routeParams, People) {

  // EditController -> NpolarEditController
  $controller('NpolarEditController', { $scope: $scope });

  // Expedition -> npolarApiResource -> ngResource
  $scope.resource = People;

  // Formula ($scope.formula is set by parent)
  $scope.formula.schema = '//api.npolar.no/schema/person';
  $scope.formula.form = 'edit/formula.json';
  $scope.formula.template = 'material';

  // edit (or new) action
  $scope.edit();

};

module.exports = PeopleEditController;
