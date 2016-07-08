'use strict';

const module = angular.module('phOverwatch', [
    'ui.router'
]);

import AppController from './controllers/app-controller';

module.controller('AppController', AppController);

module.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("", "/home/users");
    $urlRouterProvider.when("/", "/home/users");

    // For any unmatched url, send to /home
    $urlRouterProvider.otherwise("/home/users")

    $stateProvider.state('home', {
        abstract: true,
        url: '/home',
        templateUrl: 'views/home.html',
        onEnter: function(){
              console.log("enter home");
            }
    });

    $stateProvider.state('home.users', {
        url: '/users',
        templateUrl: 'templates/users.tpl.html',
        onEnter: function(){
              console.log("enter users");
            }
    });
}]);