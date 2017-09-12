'use strict';

// @ngInject

var PersonSearchController = function ($scope, $location, $controller, NpolarApiSecurity, NpolarLang, npdcAppConfig, Person) {

  let self = this;

  $controller('NpolarBaseController', { $scope: $scope });
  $scope.resource = Person;

  let lang = NpolarLang.getLang();
  if (lang !== 'en') {
    lang = 'no';
  }

  npdcAppConfig.search.local = {
    // All of these are called before p exists :/
    results: {
      title:  (p) => { if (p && p.first_name !== undefined) { return Person.fn(p); }},
      subtitle: (p) => { if (p && p.orgtree !== undefined) { return p.orgtree.join(''); }},
      detail: (p) => { if (p && p.currently_employed !== undefined) {

          let jobtitle = (p.jobtitle[lang]) ? p.jobtitle[lang] : 'employee' ;
          if (p.left) {
            jobtitle += ` [until ${p.left}]`;
          }
          return jobtitle;
        }
      },
      avatar: (p) => { if (p && p.first_name !== undefined) { return Person.initials(p); }}
    }
  };

  self.search = function () {
    let defaults = { limit: "50",
      sort: "-hired",
      //fields: 'first_name,last_name,id,updated,jobtitle,orgtree,workplace',
      facets: 'workplace,orgtree,currently_employed'
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
