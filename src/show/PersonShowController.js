'use strict';
let angular = require("angular");

// @ngInject

var PersonShowController = function ($scope, $controller, Person, NpolarLang, npdcAppConfig) {

  $controller('NpolarBaseController', {$scope: $scope});
  $scope.resource = Person;
  $scope.show();

  $scope.lang = NpolarLang;

  $scope.name = function(p) {
    return p.first_name +' '+ p.last_name;
  };

  $scope.isEmployed = function(p) {
    return (p.currently_employed !== false);
  };

  $scope.show().$promise.then(p => {
    //let left_the_building = p.currently_employed ? '' : ' [former employee]';
    //npdcAppConfig.cardTitle = `${p.first_name} ${p.last_name}${left_the_building}` ;
  });

  $scope.image = (links) => {
    let img;

    angular.forEach(links, function(link) {
      if (link.rel === 'profile-image') {
        img = link.href;
      }
    });

    return img;
  };
};

module.exports = PersonShowController;
