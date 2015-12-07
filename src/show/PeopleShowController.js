'use strict';
let angular = require("angular");

// @ngInject

var PeopleShowController = function ($scope, $controller, People, npdcAppConfig) {

  $controller('NpolarBaseController', {$scope: $scope});
  $scope.resource = People;
  $scope.show();

  $scope.show().$promise.then(data => {
    npdcAppConfig.cardTitle = data.title;
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

module.exports = PeopleShowController;
