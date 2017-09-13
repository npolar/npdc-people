'use strict';
let angular = require("angular");

// @ngInject

var PersonShowController = function ($scope, $controller, Person, NpolarLang, npdcAppConfig) {

  let self = this;

  $controller('NpolarBaseController', {$scope: $scope});

  this.isEmployed = (p) => {
    return Person.isEmployed(p);
  };

  $scope.resource = Person;
  $scope.show();

  $scope.lang = NpolarLang;

  $scope.name = function(p) {
    return p.first_name +' '+ p.last_name;
  };

  $scope.isEmployed = function(p) {
    return self.isEmployed(p);
  };

  $scope.show().$promise.then(p => {
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
