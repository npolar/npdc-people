'use strict';

// @ngInject

var PersonSearchController = function ($scope, $location, $controller, NpolarApiSecurity, NpolarLang, npdcAppConfig, Person) {

  let self = this;

  $controller('NpolarBaseController', { $scope: $scope });
  $scope.resource = Person;



  npdcAppConfig.search.local = {
    // All of these are called before p exists :/
    results: {
      title:  (p) => { if (p && p.first_name !== undefined) { return Person.fn(p); }},
      subtitle: (p) => `${p.subunit[0]} / ${p.orgunit[0]}`,
      detail: (p) => {

        let lang = NpolarLang.getLang();
        if (lang !== 'en') {
          lang = 'no';
        }
        let jobtitle = (p.jobtitle[lang]) ? p.jobtitle[lang] : 'employee' ;
          if (p.left) {
            jobtitle += ` [until ${p.left}]`;
          }
          return jobtitle;

      },
      avatar: (p) => { if (p && p.first_name !== undefined) { return Person.initials(p); }}
    }
  };

  self.search = function () {
    let defaults = { limit: "50",
      sort: "-hired",
      facets: 'workplace,orgunit,subunit,group'
    };
    let invariants = {};
    let query = Object.assign({}, defaults, $location.search(), invariants);

    $scope.search(query);
  };

  self.search();

  $scope.$on('$locationChangeSuccess', (event, data) => {
    self.search();
  });

};
module.exports = PersonSearchController;
