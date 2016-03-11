'use strict';

// @ngInject

var PersonSearchController = function ($scope, $location, $controller, NpolarLang, npdcAppConfig, Person) {

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
          let former_text = (p.currently_employed) ? '' : 'Former ';
          let jobtitle = (p.jobtitle[lang]) ? p.jobtitle[lang] : 'employee' ;
          return former_text + jobtitle;
        }
      },
      avatar: (p) => { if (p && p.first_name !== undefined) { return Person.initials(p); }}
    }
  };

  let search = function () {
    let defaults = { limit: "50",
      sort: "-updated",
      //fields: 'first_name,last_name,id,updated,jobtitle,orgtree,workplace',
      facets: 'workplace,orgtree,currently_employed,jobtitle.en'
    };
    let invariants = {};
    let query = Object.assign({}, defaults, $location.search(), invariants);

    $scope.search(query);
  };

  search();

  $scope.$on('$locationChangeSuccess', (event, data) => {
    search();
  });

};
module.exports = PersonSearchController;
