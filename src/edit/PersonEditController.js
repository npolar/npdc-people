'use strict';

/**
 * @ngInject
 */
var PersonEditController = function ($scope, $controller, $routeParams, npdcAppConfig, Person) {

  // EditController -> NpolarEditController
  $controller('NpolarEditController', { $scope: $scope });

  // Expedition -> npolarApiResource -> ngResource
  $scope.resource = Person;

  // Formula ($scope.formula is set by parent)
  $scope.formula.schema = '//api.npolar.no/schema/person-1';
  $scope.formula.form = 'edit/person-formula.json';

  // edit (or new) action
  let r = $scope.edit();

  if (r && r.$promise) {
    r.$promise.then(p => {
      let left_the_building = p.currently_employed ? '' : ' [former employee]';
      //npdcAppConfig.cardTitle = `${p.first_name} ${p.last_name}${left_the_building}` ;
    });
  }
};

module.exports = PersonEditController;

//"enum": ["/ola/", "/ola/arktis/", "/ola/antarktis/", "/ola/support/"], "multiple": true
