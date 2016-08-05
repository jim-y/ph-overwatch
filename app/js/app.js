'use strict';

import register from './lib/register';

const module = angular.module('phOverwatch', [
  'ui.router',
  'ngMaterial'
]);

// ##############################
//          controllers
// ##############################

import AppController from './controllers/app-controller';
import PlayerController from './controllers/player-controller';
import SearchController from './controllers/search-controller';
import ConfirmPlayerController from './controllers/confirm-player-controller';

module.controller('AppController', AppController);
module.controller('PlayerController', PlayerController);
module.controller('SearchController', SearchController);
module.controller('ConfirmPlayerController', ConfirmPlayerController);

// ##############################
//           services
// ##############################

import UserService from './services/player-service';

module.service('PlayerService', UserService);

// ##############################
//           directives
// ##############################

import PlayerDirective from './directives/player';

register('phOverwatch')
  .directive('player', PlayerDirective);

// ##############################
//         configuration
// ##############################

module.config(['$stateProvider', '$urlRouterProvider',
  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.when('/', '/players');
    $urlRouterProvider.otherwise('/players');
    $stateProvider.state('players', {
      url: '/players',
      templateUrl: 'views/players.html',
      controller: 'PlayerController as ctrl'
    });
  }
]);

module.run($rootScope => {
  $rootScope.$on('$stateChangeError', console.log.bind(console));
});
