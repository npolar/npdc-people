'use strict';

// @ngInject

var PersonSearchController = function ($scope, $location, $controller, Person, npdcAppConfig) {

  $controller('NpolarBaseController', { $scope: $scope });
  $scope.resource = Person;
  npdcAppConfig.cardTitle = "Person";
  npdcAppConfig.search.local = {
    results: {
      subtitle: "jobtitle/en"
    }
  };

  let defaults = { limit: "50",
    sort: "-updated",
    fields: 'title,id,updated,jobtitle.en',
    facets: 'workplace,orgtree'
  };
  let invariants = $scope.security.isAuthenticated() ? {} : { 'filter-currently_employed': true } ;
  let query = Object.assign({}, defaults, invariants);

  let search = function (q) {
    $scope.search(Object.assign({}, query, q));
  };

  search(query);

  $scope.$on('$locationChangeSuccess', (event, data) => {
    search($location.search());
  });

};
module.exports = PersonSearchController;