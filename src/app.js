'use strict';

var npdcCommon = require('npdc-common');
var AutoConfig = npdcCommon.AutoConfig;

var angular = require('angular');

var npdcPeopleApp = angular.module('npdcPeopleApp', ['npdcUi']);

npdcPeopleApp.controller('PeopleShowController', require('./show/PeopleShowController'));
npdcPeopleApp.controller('PeopleSearchController', require('./search/PeopleSearchController'));
npdcPeopleApp.controller('PeopleEditController', require('./edit/PeopleEditController'));

// Bootstrap ngResource models using NpolarApiResource
var resources = [
  {'path': '/person', 'resource': 'People'},
];

resources.forEach(service => {
  // Expressive DI syntax is needed here
  npdcPeopleApp.factory(service.resource, ['NpolarApiResource', function (NpolarApiResource) {
    return NpolarApiResource.resource(service);
  }]);
});

// Routing
npdcPeopleApp.config(require('./router'));

// API HTTP interceptor
npdcPeopleApp.config($httpProvider => {
  $httpProvider.interceptors.push('npolarApiInterceptor');
});

// Inject npolarApiConfig and run
npdcPeopleApp.run(function(npolarApiConfig, npdcAppConfig){
  var environment = "production";
  var autoconfig = new AutoConfig(environment);
  angular.extend(npolarApiConfig, autoconfig);

  npdcAppConfig.cardTitle = '';
  npdcAppConfig.toolbarTitle = 'People';

  console.log("npolarApiConfig", npolarApiConfig);
});
