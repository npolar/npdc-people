'use strict';

/**
 * @ngInject
 */
var PersonEditController = function ($scope, $controller, $routeParams,
  formula, formulaAutoCompleteService,
  npdcAppConfig, Person) {

  // EditController -> NpolarEditController
  $controller('NpolarEditController', { $scope: $scope });

  // Person -> PersonResource -> ngResource
  $scope.resource = Person;

  // Formula
  $scope.formula = formula.getInstance({
    schema: '//api.npolar.no/schema/person-1',
    form: 'edit/person-formula.json',
    templates: npdcAppConfig.formula.templates,
    languages: npdcAppConfig.formula.languages
  });

  //let autocompleteFacets= ['first_name', 'last_name', 'workplace', 'jobtitle.en', 'jobtitle.no'];
  //formulaAutoCompleteService.autocompleteFacets(autocompleteFacets);

  // edit (or new) action
  let r = $scope.edit();

  if (r && r.$promise) {
    r.$promise.then(p => {
      //let left_the_building = p.currently_employed ? '' : ' [former employee]';
      //npdcAppConfig.cardTitle = `${p.first_name} ${p.last_name}${left_the_building}` ;
    });
  }
};

module.exports = PersonEditController;
