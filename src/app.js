'use strict';

var npdcCommon = require('npdc-common');
var AutoConfig = npdcCommon.AutoConfig;

var angular = require('angular');

var npdcPersonApp = angular.module('npdcPersonApp', ['npdcCommon']);

npdcPersonApp.controller('PersonShowController', require('./show/PersonShowController'));
npdcPersonApp.controller('PersonSearchController', require('./search/PersonSearchController'));
npdcPersonApp.controller('PersonEditController', require('./edit/PersonEditController'));
npdcPersonApp.factory('Person', require('./model/Person.js'));

// Bootstrap ngResource models using NpolarApiResource
var resources = [
  {'path': '/person', 'resource': 'PersonResource'},
];

resources.forEach(service => {
  // Expressive DI syntax is needed here
  npdcPersonApp.factory(service.resource, ['NpolarApiResource', function (NpolarApiResource) {
    return NpolarApiResource.resource(service);
  }]);
});



// Routing
npdcPersonApp.config(require('./router'));

// API HTTP interceptor
npdcPersonApp.config($httpProvider => {
  $httpProvider.interceptors.push('npolarApiInterceptor');
});

// Inject npolarApiConfig and run
npdcPersonApp.run(function(npolarApiConfig, npdcAppConfig){
  var environment = "production";
  var autoconfig = new AutoConfig(environment);
  angular.extend(npolarApiConfig, autoconfig);

  npdcAppConfig.toolbarTitle = 'Person';

  console.log("npolarApiConfig", npolarApiConfig);
});
