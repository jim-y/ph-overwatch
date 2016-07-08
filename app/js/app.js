'use strict';

const module = angular.module('phOverwatch', [
    'ui.router'
]);

// ##############################
//          controllers
// ##############################

import AppController from './controllers/app-controller';
import UserController from './controllers/user-controller';

module.controller('AppController', AppController);
module.controller('UserController', UserController);

// ##############################
//           services
// ##############################

import UserService from './services/user-service';

module.service('UserService', UserService);

// ##############################
//         configuration
// ##############################

module.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("", "/home/users");
    $urlRouterProvider.when("/", "/home/users");
    $urlRouterProvider.otherwise("/home/users");

    $stateProvider.state('home', {
        abstract: true,
        url: '/home',
        templateUrl: 'views/home.html'
    });

    $stateProvider.state('home.users', {
        url: '/users',
        templateUrl: 'templates/users.tpl.html',
        controller: 'UserController as ctrl'
    });

}]);