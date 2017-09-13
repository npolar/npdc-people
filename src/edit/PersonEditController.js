'use strict';

/**
 * @ngInject
 */
var PersonEditController = function ($scope, $controller, $routeParams,
  formula, formulaAutoCompleteService,
  npdcAppConfig, Person) {

  Person.create = () => {
    const d = new Date();
    const m = (d.getMonth()+1 >= 10) ? d.getMonth()+1 : `0${d.getMonth()+1}`;
    const hired = `${d.getFullYear()}-${m}-01`;
    return  {
      workplace: "Tromsø",
      organisation: "npolar.no",
      hired
    };
  };

  // EditController -> NpolarEditController
  $controller('NpolarEditController', { $scope: $scope });

  // Person -> PersonResource -> ngResource
  $scope.resource = Person;

  // Formula
  $scope.formula = formula.getInstance({
    //schema: 'edit/person-1.json',
    schema: '//api.npolar.no/schema/person-1',
    form: 'edit/person-formula.json',
    templates: npdcAppConfig.formula.templates,
    languages: npdcAppConfig.formula.languages
  });

  const autocompleteFacets= ['first_name', 'last_name', 'workplace', 'organisation', 'jobtitle.en', 'jobtitle.no'];
  formulaAutoCompleteService.autocompleteFacets(autocompleteFacets, $scope.resource, $scope.formula);

  // edit (or new) action
  let r = $scope.edit();

  if (r && r.$promise) {
    r.$promise.then(p => {
      $scope.is_employed = Person.isEmployed(p);
    });
  }
};

module.exports = PersonEditController;
