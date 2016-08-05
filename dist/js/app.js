(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _register = require('./lib/register');

var _register2 = _interopRequireDefault(_register);

var _appController = require('./controllers/app-controller');

var _appController2 = _interopRequireDefault(_appController);

var _playerController = require('./controllers/player-controller');

var _playerController2 = _interopRequireDefault(_playerController);

var _searchController = require('./controllers/search-controller');

var _searchController2 = _interopRequireDefault(_searchController);

var _confirmPlayerController = require('./controllers/confirm-player-controller');

var _confirmPlayerController2 = _interopRequireDefault(_confirmPlayerController);

var _playerService = require('./services/player-service');

var _playerService2 = _interopRequireDefault(_playerService);

var _player = require('./directives/player');

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _module = angular.module('phOverwatch', ['ui.router', 'ngMaterial']);

// ##############################
//          controllers
// ##############################

_module.controller('AppController', _appController2.default);
_module.controller('PlayerController', _playerController2.default);
_module.controller('SearchController', _searchController2.default);
_module.controller('ConfirmPlayerController', _confirmPlayerController2.default);

// ##############################
//           services
// ##############################

_module.service('PlayerService', _playerService2.default);

// ##############################
//           directives
// ##############################

(0, _register2.default)('phOverwatch').directive('player', _player2.default);

// ##############################
//         configuration
// ##############################

_module.config(['$stateProvider', '$urlRouterProvider', function config($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.when('/', '/players');
  $urlRouterProvider.otherwise('/players');
  $stateProvider.state('players', {
    url: '/players',
    templateUrl: 'views/players.html',
    controller: 'PlayerController as ctrl'
  });
}]);

_module.run(function ($rootScope) {
  $rootScope.$on('$stateChangeError', console.log.bind(console));
});

},{"./controllers/app-controller":2,"./controllers/confirm-player-controller":3,"./controllers/player-controller":4,"./controllers/search-controller":5,"./directives/player":6,"./lib/register":7,"./services/player-service":8}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AppController = function AppController() {
    _classCallCheck(this, AppController);

    this.appName = 'ph-Overwatch';
};

exports.default = AppController;

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ConfirmPlayerController = function () {
  function ConfirmPlayerController($scope, $mdDialog, player) {
    _classCallCheck(this, ConfirmPlayerController);

    this.$scope = $scope;
    this.dialog = $mdDialog;
    this.player = player;
  }

  _createClass(ConfirmPlayerController, [{
    key: 'cancel',
    value: function cancel() {
      this.dialog.cancel();
    }
  }, {
    key: 'answer',
    value: function answer(_answer) {
      this.dialog.hide(_answer);
    }
  }]);

  return ConfirmPlayerController;
}();

exports.default = ConfirmPlayerController;

},{}],4:[function(require,module,exports){
/**
 * Created by kling on 7/8/16.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayerController = function () {
  _createClass(PlayerController, null, [{
    key: '$inject',
    get: function get() {
      return ['$scope', 'PlayerService'];
    }
  }]);

  function PlayerController($scope, playerService) {
    _classCallCheck(this, PlayerController);

    this.$scope = $scope;
    this.playerService = playerService;
  }

  return PlayerController;
}();

exports.default = PlayerController;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SearchController = function () {
  _createClass(SearchController, null, [{
    key: '$inject',
    get: function get() {
      return ['$scope', 'PlayerService', '$q', '$mdDialog'];
    }
  }]);

  function SearchController($scope, playerService, $q, $mdDialog) {
    _classCallCheck(this, SearchController);

    this.$scope = $scope;
    this.playerService = playerService;
    this.$q = $q;
    this.dialog = $mdDialog;
    this.player = '';
    this.playerProfile = null;
    this.searching = false;
  }

  _createClass(SearchController, [{
    key: 'searchPlayer',
    value: function searchPlayer(battletag, $event) {
      var _this = this;

      if ($event.keyCode === 13) {
        this.searching = true;
        this.$q.when(this.playerService.searchPlayer(battletag)).then(function (player) {
          _this.playerProfile = player;
          _this.dialog.show({
            controller: 'ConfirmPlayerController as ctrl',
            templateUrl: 'templates/confirm-player.tpl.html',
            locals: { player: player },
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: true,
            fullscreen: false
          }).then(function (answer) {
            console.log('You said the information was "' + answer + '".');
          }, function () {
            console.log('You cancelled the dialog.');
          });
        });
      }
    }
  }]);

  return SearchController;
}();

exports.default = SearchController;

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayerController = function () {
  function PlayerController() {
    _classCallCheck(this, PlayerController);

    this.player = this.model;
    console.log(this.model);
  }

  _createClass(PlayerController, [{
    key: 'getPlayerProfileUrl',
    value: function getPlayerProfileUrl(player) {
      if (!player) return;
      return 'http://masteroverwatch.com/profile/pc/eu/' + player.battletag.replace('#', '-');
    }
  }]);

  return PlayerController;
}();

var PlayerDirective = function PlayerDirective() {
  _classCallCheck(this, PlayerDirective);

  this.restrict = 'EA';
  this.templateUrl = 'templates/player.tpl.html';
  this.controller = PlayerController;
  this.bindToController = true;
  this.controllerAs = 'ctrl';
  this.scope = {
    model: '='
  };
};

exports.default = PlayerDirective;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = register;
/**
 * A helper class to simplify registering Angular components and provide a consistent syntax for doing so.
 */
function register(appName) {

  var app = angular.module(appName);

  return {
    directive: directive,
    controller: controller,
    service: service,
    provider: provider,
    factory: factory
  };

  function directive(name, constructorFn) {

    constructorFn = _normalizeConstructor(constructorFn);

    if (!constructorFn.prototype.compile) {
      // create an empty compile function if none was defined.
      constructorFn.prototype.compile = function () {};
    }

    var originalCompileFn = _cloneFunction(constructorFn.prototype.compile);

    // Decorate the compile method to automatically return the link method (if it exists)
    // and bind it to the context of the constructor (so `this` works correctly).
    // This gets around the problem of a non-lexical "this" which occurs when the directive class itself
    // returns `this.link` from within the compile function.
    _override(constructorFn.prototype, 'compile', function () {
      return function () {
        originalCompileFn.apply(this, arguments);

        if (constructorFn.prototype.link) {
          return constructorFn.prototype.link.bind(this);
        }
      };
    });

    var factoryArray = _createFactoryArray(constructorFn);

    app.directive(name, factoryArray);
    return this;
  }

  function controller(name, contructorFn) {
    app.controller(name, contructorFn);
    return this;
  }

  function service(name, contructorFn) {
    app.service(name, contructorFn);
    return this;
  }

  function provider(name, constructorFn) {
    app.provider(name, constructorFn);
    return this;
  }

  function factory(name, constructorFn) {
    constructorFn = _normalizeConstructor(constructorFn);
    var factoryArray = _createFactoryArray(constructorFn);
    app.factory(name, factoryArray);
    return this;
  }

  /**
   * If the constructorFn is an array of type ['dep1', 'dep2', ..., constructor() {}]
   * we need to pull out the array of dependencies and add it as an $inject property of the
   * actual constructor function.
   * @param input
   * @returns {*}
   * @private
   */
  function _normalizeConstructor(input) {
    var constructorFn;

    if (input.constructor === Array) {
      //
      var injected = input.slice(0, input.length - 1);
      constructorFn = input[input.length - 1];
      constructorFn.$inject = injected;
    } else {
      constructorFn = input;
    }

    return constructorFn;
  }

  /**
   * Convert a constructor function into a factory function which returns a new instance of that
   * constructor, with the correct dependencies automatically injected as arguments.
   *
   * In order to inject the dependencies, they must be attached to the constructor function with the
   * `$inject` property annotation.
   *
   * @param constructorFn
   * @returns {Array.<T>}
   * @private
   */
  function _createFactoryArray(constructorFn) {
    // get the array of dependencies that are needed by this component (as contained in the `$inject` array)
    var args = constructorFn.$inject || [];
    var factoryArray = args.slice(); // create a copy of the array
    // The factoryArray uses Angular's array notation whereby each element of the array is the name of a
    // dependency, and the final item is the factory function itself.
    factoryArray.push(function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      //return new constructorFn(...args);
      var instance = new (Function.prototype.bind.apply(constructorFn, [null].concat(args)))();
      for (var key in instance) {
        instance[key] = instance[key];
      }
      return instance;
    });

    return factoryArray;
  }

  /**
   * Clone a function
   * @param original
   * @returns {Function}
   */
  function _cloneFunction(original) {
    return function () {
      return original.apply(this, arguments);
    };
  }

  /**
   * Override an object's method with a new one specified by `callback`.
   * @param object
   * @param methodName
   * @param callback
   */
  function _override(object, methodName, callback) {
    object[methodName] = callback(object[methodName]);
  }
}

},{}],8:[function(require,module,exports){
/**
 * Created by kling on 7/8/16.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayerService = function () {
  _createClass(PlayerService, null, [{
    key: '$inject',
    get: function get() {
      return ['$http', '$q'];
    }
  }]);

  function PlayerService($http, $q) {
    _classCallCheck(this, PlayerService);

    this.$http = $http;
    this.$q = $q;
    this.db = firebase.database();
    this.players = [];
    this.activePlayer = null;
    this._initializePlayers();
  }

  _createClass(PlayerService, [{
    key: '_initializePlayers',
    value: function _initializePlayers() {
      var _this = this;

      console.log('Getting all players');
      this.$q.when(this.getAllPlayers()).then(function (players) {
        var _players = [];
        Object.keys(players).forEach(function (playerKey) {
          _players.push(players[playerKey]);
        });
        _this.players = _players;
        console.log(_this.players);
      });
    }
  }, {
    key: 'getAllPlayers',
    value: function getAllPlayers() {
      return this.db.ref().child('players').once('value').then(function (snapshot) {
        return snapshot.val();
      });
    }
  }, {
    key: 'savePlayer',
    value: function savePlayer(payload) {
      // Get a key for a new Post.
      var userKey = this.db.ref().child('players').push().key;
      payload._key = userKey;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      var updates = {};
      updates['/players/' + userKey] = payload;

      return this.db.ref().update(updates);
    }
  }, {
    key: 'searchPlayer',
    value: function searchPlayer(battletag) {
      var _this2 = this;

      return this.$http({
        method: 'GET',
        url: this._getApiRoute(battletag),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(function (response) {
        if (response && response.error != null && response.error === 404) {
          return console.error('No such battle tag');
          // give ui feedback
        }

        var payload = response.data.data;
        payload.battletag = battletag;
        //this.players.push(response.data.data);
        _this2.activePlayer = payload;
        return payload;
        //return this.savePlayer(payload);
      }).catch(function (err) {
        console.error(err);
      });
    }
  }, {
    key: '_getApiRoute',
    value: function _getApiRoute(battletag) {
      return 'https://api.lootbox.eu/pc/eu/' + battletag.replace('#', '-') + '/profile';
    }
  }]);

  return PlayerService;
}();

exports.default = PlayerService;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvYXBwLmpzIiwiYXBwL2pzL2NvbnRyb2xsZXJzL2FwcC1jb250cm9sbGVyLmpzIiwiYXBwL2pzL2NvbnRyb2xsZXJzL2NvbmZpcm0tcGxheWVyLWNvbnRyb2xsZXIuanMiLCJhcHAvanMvY29udHJvbGxlcnMvcGxheWVyLWNvbnRyb2xsZXIuanMiLCJhcHAvanMvY29udHJvbGxlcnMvc2VhcmNoLWNvbnRyb2xsZXIuanMiLCJhcHAvanMvZGlyZWN0aXZlcy9wbGF5ZXIuanMiLCJhcHAvanMvbGliL3JlZ2lzdGVyLmpzIiwiYXBwL2pzL3NlcnZpY2VzL3BsYXllci1zZXJ2aWNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBRUE7Ozs7QUFXQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQVdBOzs7O0FBUUE7Ozs7OztBQS9CQSxJQUFNLFVBQVMsUUFBUSxNQUFSLENBQWUsYUFBZixFQUE4QixDQUMzQyxXQUQyQyxFQUUzQyxZQUYyQyxDQUE5QixDQUFmOzs7Ozs7QUFjQSxRQUFPLFVBQVAsQ0FBa0IsZUFBbEI7QUFDQSxRQUFPLFVBQVAsQ0FBa0Isa0JBQWxCO0FBQ0EsUUFBTyxVQUFQLENBQWtCLGtCQUFsQjtBQUNBLFFBQU8sVUFBUCxDQUFrQix5QkFBbEI7Ozs7OztBQVFBLFFBQU8sT0FBUCxDQUFlLGVBQWY7Ozs7OztBQVFBLHdCQUFTLGFBQVQsRUFDRyxTQURILENBQ2EsUUFEYjs7Ozs7O0FBT0EsUUFBTyxNQUFQLENBQWMsQ0FBQyxnQkFBRCxFQUFtQixvQkFBbkIsRUFDWixTQUFTLE1BQVQsQ0FBZ0IsY0FBaEIsRUFBZ0Msa0JBQWhDLEVBQW9EO0FBQ2xELHFCQUFtQixJQUFuQixDQUF3QixHQUF4QixFQUE2QixVQUE3QjtBQUNBLHFCQUFtQixTQUFuQixDQUE2QixVQUE3QjtBQUNBLGlCQUFlLEtBQWYsQ0FBcUIsU0FBckIsRUFB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aEUsaUJBQU8sUUFBUSxLQUFSLENBQWMsb0JBQWQsQ0FBUDs7QUFFRDs7QUFFRCxZQUFNLFVBQVUsU0FBUyxJQUFULENBQWMsSUFBOUI7QUFDQSxnQkFBUSxTQUFSLEdBQW9CLFNBQXBCOztBQUVBLGVBQUssWUFBTCxHQUFvQixPQUFwQjtBQUNBLGVBQU8sT0FBUDs7QUFFRCxPQXBCSSxFQXFCSixLQXJCSSxDQXFCRSxlQUFPO0FBQ1osZ0JBQVEsS0FBUixDQUFjLEdBQWQ7QUFDRCxPQXZCSSxDQUFQO0FBd0JEOzs7aUNBRVksUyxFQUFXO0FBQ3RCLCtDQUF1QyxVQUFVLE9BQVYsQ0FBa0IsR0FBbEIsRUFBdUIsR0FBdkIsQ0FBdkM7QUFDRDs7Ozs7O2tCQXBGa0IsYSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCByZWdpc3RlciBmcm9tICcuL2xpYi9yZWdpc3Rlcic7XG5cbmNvbnN0IG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaE92ZXJ3YXRjaCcsIFtcbiAgJ3VpLnJvdXRlcicsXG4gICduZ01hdGVyaWFsJ1xuXSk7XG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gICAgICAgICAgY29udHJvbGxlcnNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5pbXBvcnQgQXBwQ29udHJvbGxlciBmcm9tICcuL2NvbnRyb2xsZXJzL2FwcC1jb250cm9sbGVyJztcbmltcG9ydCBQbGF5ZXJDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvcGxheWVyLWNvbnRyb2xsZXInO1xuaW1wb3J0IFNlYXJjaENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9zZWFyY2gtY29udHJvbGxlcic7XG5pbXBvcnQgQ29uZmlybVBsYXllckNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9jb25maXJtLXBsYXllci1jb250cm9sbGVyJztcblxubW9kdWxlLmNvbnRyb2xsZXIoJ0FwcENvbnRyb2xsZXInLCBBcHBDb250cm9sbGVyKTtcbm1vZHVsZS5jb250cm9sbGVyKCdQbGF5ZXJDb250cm9sbGVyJywgUGxheWVyQ29udHJvbGxlcik7XG5tb2R1bGUuY29udHJvbGxlcignU2VhcmNoQ29udHJvbGxlcicsIFNlYXJjaENvbnRyb2xsZXIpO1xubW9kdWxlLmNvbnRyb2xsZXIoJ0NvbmZpcm1QbGF5ZXJDb250cm9sbGVyJywgQ29uZmlybVBsYXllckNvbnRyb2xsZXIpO1xuXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vICAgICAgICAgICBzZXJ2aWNlc1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmltcG9ydCBVc2VyU2VydmljZSBmcm9tICcuL3NlcnZpY2VzL3BsYXllci1zZXJ2aWNlJztcblxubW9kdWxlLnNlcnZpY2UoJ1BsYXllclNlcnZpY2UnLCBVc2VyU2VydmljZSk7XG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gICAgICAgICAgIGRpcmVjdGl2ZXNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5pbXBvcnQgUGxheWVyRGlyZWN0aXZlIGZyb20gJy4vZGlyZWN0aXZlcy9wbGF5ZXInO1xuXG5yZWdpc3RlcigncGhPdmVyd2F0Y2gnKVxuICAuZGlyZWN0aXZlKCdwbGF5ZXInLCBQbGF5ZXJEaXJlY3RpdmUpO1xuXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vICAgICAgICAgY29uZmlndXJhdGlvblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbm1vZHVsZS5jb25maWcoWyckc3RhdGVQcm92aWRlcicsICckdXJsUm91dGVyUHJvdmlkZXInLFxuICBmdW5jdGlvbiBjb25maWcoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuICAgICR1cmxSb3V0ZXJQcm92aWRlci53aGVuKCcvJywgJy9wbGF5ZXJzJyk7XG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL3BsYXllcnMnKTtcbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgncGxheWVycycsIHtcbiAgICAgIHVybDogJy9wbGF5ZXJzJyxcbiAgICAgIHRlbXBsYXRlVXJsOiAndmlld3MvcGxheWVycy5odG1sJyxcbiAgICAgIGNvbnRyb2xsZXI6ICdQbGF5ZXJDb250cm9sbGVyIGFzIGN0cmwnXG4gICAgfSk7XG4gIH1cbl0pO1xuXG5tb2R1bGUucnVuKCRyb290U2NvcGUgPT4ge1xuICAkcm9vdFNjb3BlLiRvbignJHN0YXRlQ2hhbmdlRXJyb3InLCBjb25zb2xlLmxvZy5iaW5kKGNvbnNvbGUpKTtcbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5hcHBOYW1lID0gJ3BoLU92ZXJ3YXRjaCc7XG4gICAgfVxufSIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29uZmlybVBsYXllckNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3Rvcigkc2NvcGUsICRtZERpYWxvZywgcGxheWVyKSB7XG4gICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgdGhpcy5kaWFsb2cgPSAkbWREaWFsb2c7XG4gICAgdGhpcy5wbGF5ZXIgPSBwbGF5ZXI7XG4gIH1cblxuICBjYW5jZWwoKSB7XG4gICAgdGhpcy5kaWFsb2cuY2FuY2VsKCk7XG4gIH1cblxuICBhbnN3ZXIoYW5zd2VyKSB7XG4gICAgdGhpcy5kaWFsb2cuaGlkZShhbnN3ZXIpO1xuICB9XG59XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkga2xpbmcgb24gNy84LzE2LlxuICovXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllckNvbnRyb2xsZXIge1xuXG4gIHN0YXRpYyBnZXQgJGluamVjdCgpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJyRzY29wZScsXG4gICAgICAnUGxheWVyU2VydmljZSdcbiAgICBdO1xuICB9XG5cbiAgY29uc3RydWN0b3IoJHNjb3BlLCBwbGF5ZXJTZXJ2aWNlKSB7XG4gICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgdGhpcy5wbGF5ZXJTZXJ2aWNlID0gcGxheWVyU2VydmljZTtcbiAgfVxuXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFNlYXJjaENvbnRyb2xsZXIge1xuXG4gIHN0YXRpYyBnZXQgJGluamVjdCgpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJyRzY29wZScsXG4gICAgICAnUGxheWVyU2VydmljZScsXG4gICAgICAnJHEnLFxuICAgICAgJyRtZERpYWxvZydcbiAgICBdO1xuICB9XG5cbiAgY29uc3RydWN0b3IoJHNjb3BlLCBwbGF5ZXJTZXJ2aWNlLCAkcSwgJG1kRGlhbG9nKSB7XG4gICAgdGhpcy4kc2NvcGUgPSAkc2NvcGU7XG4gICAgdGhpcy5wbGF5ZXJTZXJ2aWNlID0gcGxheWVyU2VydmljZTtcbiAgICB0aGlzLiRxID0gJHE7XG4gICAgdGhpcy5kaWFsb2cgPSAkbWREaWFsb2c7XG4gICAgdGhpcy5wbGF5ZXIgPSAnJztcbiAgICB0aGlzLnBsYXllclByb2ZpbGUgPSBudWxsO1xuICAgIHRoaXMuc2VhcmNoaW5nID0gZmFsc2U7XG4gIH1cblxuICBzZWFyY2hQbGF5ZXIoYmF0dGxldGFnLCAkZXZlbnQpIHtcbiAgICBpZiAoJGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XG4gICAgICB0aGlzLnNlYXJjaGluZyA9IHRydWU7XG4gICAgICB0aGlzLiRxLndoZW4odGhpcy5wbGF5ZXJTZXJ2aWNlLnNlYXJjaFBsYXllcihiYXR0bGV0YWcpKVxuICAgICAgICAudGhlbihwbGF5ZXIgPT4ge1xuICAgICAgICAgIHRoaXMucGxheWVyUHJvZmlsZSA9IHBsYXllcjtcbiAgICAgICAgICB0aGlzLmRpYWxvZy5zaG93KHtcbiAgICAgICAgICAgIGNvbnRyb2xsZXI6ICdDb25maXJtUGxheWVyQ29udHJvbGxlciBhcyBjdHJsJyxcbiAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL2NvbmZpcm0tcGxheWVyLnRwbC5odG1sJyxcbiAgICAgICAgICAgIGxvY2FsczogeyBwbGF5ZXIgfSxcbiAgICAgICAgICAgIHBhcmVudDogYW5ndWxhci5lbGVtZW50KGRvY3VtZW50LmJvZHkpLFxuICAgICAgICAgICAgdGFyZ2V0RXZlbnQ6ICRldmVudCxcbiAgICAgICAgICAgIGNsaWNrT3V0c2lkZVRvQ2xvc2U6IHRydWUsXG4gICAgICAgICAgICBmdWxsc2NyZWVuOiBmYWxzZVxuICAgICAgICAgIH0pLnRoZW4oXG4gICAgICAgICAgICBhbnN3ZXIgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnWW91IHNhaWQgdGhlIGluZm9ybWF0aW9uIHdhcyBcIicgKyBhbnN3ZXIgKyAnXCIuJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnWW91IGNhbmNlbGxlZCB0aGUgZGlhbG9nLicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG59XG4iLCIndXNlIHN0cmljdCc7XG5cbmNsYXNzIFBsYXllckNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnBsYXllciA9IHRoaXMubW9kZWw7XG4gICAgY29uc29sZS5sb2codGhpcy5tb2RlbCk7XG4gIH1cblxuICBnZXRQbGF5ZXJQcm9maWxlVXJsKHBsYXllcikge1xuICAgIGlmICghcGxheWVyKSByZXR1cm47XG4gICAgcmV0dXJuIGBodHRwOi8vbWFzdGVyb3ZlcndhdGNoLmNvbS9wcm9maWxlL3BjL2V1LyR7cGxheWVyLmJhdHRsZXRhZy5yZXBsYWNlKCcjJywgJy0nKX1gO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllckRpcmVjdGl2ZSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucmVzdHJpY3QgPSAnRUEnO1xuICAgIHRoaXMudGVtcGxhdGVVcmwgPSAndGVtcGxhdGVzL3BsYXllci50cGwuaHRtbCc7XG4gICAgdGhpcy5jb250cm9sbGVyID0gUGxheWVyQ29udHJvbGxlcjtcbiAgICB0aGlzLmJpbmRUb0NvbnRyb2xsZXIgPSB0cnVlO1xuICAgIHRoaXMuY29udHJvbGxlckFzID0gJ2N0cmwnO1xuICAgIHRoaXMuc2NvcGUgPSB7XG4gICAgICBtb2RlbDogJz0nXG4gICAgfTtcbiAgfVxufVxuIiwiLyoqXG4gKiBBIGhlbHBlciBjbGFzcyB0byBzaW1wbGlmeSByZWdpc3RlcmluZyBBbmd1bGFyIGNvbXBvbmVudHMgYW5kIHByb3ZpZGUgYSBjb25zaXN0ZW50IHN5bnRheCBmb3IgZG9pbmcgc28uXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlZ2lzdGVyKGFwcE5hbWUpIHtcblxuICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoYXBwTmFtZSk7XG5cbiAgcmV0dXJuIHtcbiAgICBkaXJlY3RpdmU6IGRpcmVjdGl2ZSxcbiAgICBjb250cm9sbGVyOiBjb250cm9sbGVyLFxuICAgIHNlcnZpY2U6IHNlcnZpY2UsXG4gICAgcHJvdmlkZXI6IHByb3ZpZGVyLFxuICAgIGZhY3Rvcnk6IGZhY3RvcnlcbiAgfTtcblxuICBmdW5jdGlvbiBkaXJlY3RpdmUobmFtZSwgY29uc3RydWN0b3JGbikge1xuXG4gICAgY29uc3RydWN0b3JGbiA9IF9ub3JtYWxpemVDb25zdHJ1Y3Rvcihjb25zdHJ1Y3RvckZuKTtcblxuICAgIGlmICghY29uc3RydWN0b3JGbi5wcm90b3R5cGUuY29tcGlsZSkge1xuICAgICAgLy8gY3JlYXRlIGFuIGVtcHR5IGNvbXBpbGUgZnVuY3Rpb24gaWYgbm9uZSB3YXMgZGVmaW5lZC5cbiAgICAgIGNvbnN0cnVjdG9yRm4ucHJvdG90eXBlLmNvbXBpbGUgPSAoKSA9PiB7fTtcbiAgICB9XG5cbiAgICB2YXIgb3JpZ2luYWxDb21waWxlRm4gPSBfY2xvbmVGdW5jdGlvbihjb25zdHJ1Y3RvckZuLnByb3RvdHlwZS5jb21waWxlKTtcblxuICAgIC8vIERlY29yYXRlIHRoZSBjb21waWxlIG1ldGhvZCB0byBhdXRvbWF0aWNhbGx5IHJldHVybiB0aGUgbGluayBtZXRob2QgKGlmIGl0IGV4aXN0cylcbiAgICAvLyBhbmQgYmluZCBpdCB0byB0aGUgY29udGV4dCBvZiB0aGUgY29uc3RydWN0b3IgKHNvIGB0aGlzYCB3b3JrcyBjb3JyZWN0bHkpLlxuICAgIC8vIFRoaXMgZ2V0cyBhcm91bmQgdGhlIHByb2JsZW0gb2YgYSBub24tbGV4aWNhbCBcInRoaXNcIiB3aGljaCBvY2N1cnMgd2hlbiB0aGUgZGlyZWN0aXZlIGNsYXNzIGl0c2VsZlxuICAgIC8vIHJldHVybnMgYHRoaXMubGlua2AgZnJvbSB3aXRoaW4gdGhlIGNvbXBpbGUgZnVuY3Rpb24uXG4gICAgX292ZXJyaWRlKGNvbnN0cnVjdG9yRm4ucHJvdG90eXBlLCAnY29tcGlsZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIG9yaWdpbmFsQ29tcGlsZUZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cbiAgICAgICAgaWYgKGNvbnN0cnVjdG9yRm4ucHJvdG90eXBlLmxpbmspIHtcbiAgICAgICAgICByZXR1cm4gY29uc3RydWN0b3JGbi5wcm90b3R5cGUubGluay5iaW5kKHRoaXMpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgdmFyIGZhY3RvcnlBcnJheSA9IF9jcmVhdGVGYWN0b3J5QXJyYXkoY29uc3RydWN0b3JGbik7XG5cbiAgICBhcHAuZGlyZWN0aXZlKG5hbWUsIGZhY3RvcnlBcnJheSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmdW5jdGlvbiBjb250cm9sbGVyKG5hbWUsIGNvbnRydWN0b3JGbikge1xuICAgIGFwcC5jb250cm9sbGVyKG5hbWUsIGNvbnRydWN0b3JGbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmdW5jdGlvbiBzZXJ2aWNlKG5hbWUsIGNvbnRydWN0b3JGbikge1xuICAgIGFwcC5zZXJ2aWNlKG5hbWUsIGNvbnRydWN0b3JGbik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmdW5jdGlvbiBwcm92aWRlcihuYW1lLCBjb25zdHJ1Y3RvckZuKSB7XG4gICAgYXBwLnByb3ZpZGVyKG5hbWUsIGNvbnN0cnVjdG9yRm4pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZnVuY3Rpb24gZmFjdG9yeShuYW1lLCBjb25zdHJ1Y3RvckZuKSB7XG4gICAgY29uc3RydWN0b3JGbiA9IF9ub3JtYWxpemVDb25zdHJ1Y3Rvcihjb25zdHJ1Y3RvckZuKTtcbiAgICB2YXIgZmFjdG9yeUFycmF5ID0gX2NyZWF0ZUZhY3RvcnlBcnJheShjb25zdHJ1Y3RvckZuKTtcbiAgICBhcHAuZmFjdG9yeShuYW1lLCBmYWN0b3J5QXJyYXkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIElmIHRoZSBjb25zdHJ1Y3RvckZuIGlzIGFuIGFycmF5IG9mIHR5cGUgWydkZXAxJywgJ2RlcDInLCAuLi4sIGNvbnN0cnVjdG9yKCkge31dXG4gICAqIHdlIG5lZWQgdG8gcHVsbCBvdXQgdGhlIGFycmF5IG9mIGRlcGVuZGVuY2llcyBhbmQgYWRkIGl0IGFzIGFuICRpbmplY3QgcHJvcGVydHkgb2YgdGhlXG4gICAqIGFjdHVhbCBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAgICogQHBhcmFtIGlucHV0XG4gICAqIEByZXR1cm5zIHsqfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZnVuY3Rpb24gX25vcm1hbGl6ZUNvbnN0cnVjdG9yKGlucHV0KSB7XG4gICAgdmFyIGNvbnN0cnVjdG9yRm47XG5cbiAgICBpZiAoaW5wdXQuY29uc3RydWN0b3IgPT09IEFycmF5KSB7XG4gICAgICAvL1xuICAgICAgdmFyIGluamVjdGVkID0gaW5wdXQuc2xpY2UoMCwgaW5wdXQubGVuZ3RoIC0gMSk7XG4gICAgICBjb25zdHJ1Y3RvckZuID0gaW5wdXRbaW5wdXQubGVuZ3RoIC0gMV07XG4gICAgICBjb25zdHJ1Y3RvckZuLiRpbmplY3QgPSBpbmplY3RlZDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3RydWN0b3JGbiA9IGlucHV0O1xuICAgIH1cblxuICAgIHJldHVybiBjb25zdHJ1Y3RvckZuO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgYSBjb25zdHJ1Y3RvciBmdW5jdGlvbiBpbnRvIGEgZmFjdG9yeSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIHRoYXRcbiAgICogY29uc3RydWN0b3IsIHdpdGggdGhlIGNvcnJlY3QgZGVwZW5kZW5jaWVzIGF1dG9tYXRpY2FsbHkgaW5qZWN0ZWQgYXMgYXJndW1lbnRzLlxuICAgKlxuICAgKiBJbiBvcmRlciB0byBpbmplY3QgdGhlIGRlcGVuZGVuY2llcywgdGhleSBtdXN0IGJlIGF0dGFjaGVkIHRvIHRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiB3aXRoIHRoZVxuICAgKiBgJGluamVjdGAgcHJvcGVydHkgYW5ub3RhdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIGNvbnN0cnVjdG9yRm5cbiAgICogQHJldHVybnMge0FycmF5LjxUPn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIF9jcmVhdGVGYWN0b3J5QXJyYXkoY29uc3RydWN0b3JGbikge1xuICAgIC8vIGdldCB0aGUgYXJyYXkgb2YgZGVwZW5kZW5jaWVzIHRoYXQgYXJlIG5lZWRlZCBieSB0aGlzIGNvbXBvbmVudCAoYXMgY29udGFpbmVkIGluIHRoZSBgJGluamVjdGAgYXJyYXkpXG4gICAgdmFyIGFyZ3MgPSBjb25zdHJ1Y3RvckZuLiRpbmplY3QgfHwgW107XG4gICAgdmFyIGZhY3RvcnlBcnJheSA9IGFyZ3Muc2xpY2UoKTsgLy8gY3JlYXRlIGEgY29weSBvZiB0aGUgYXJyYXlcbiAgICAvLyBUaGUgZmFjdG9yeUFycmF5IHVzZXMgQW5ndWxhcidzIGFycmF5IG5vdGF0aW9uIHdoZXJlYnkgZWFjaCBlbGVtZW50IG9mIHRoZSBhcnJheSBpcyB0aGUgbmFtZSBvZiBhXG4gICAgLy8gZGVwZW5kZW5jeSwgYW5kIHRoZSBmaW5hbCBpdGVtIGlzIHRoZSBmYWN0b3J5IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICBmYWN0b3J5QXJyYXkucHVzaCgoLi4uYXJncykgPT4ge1xuICAgICAgLy9yZXR1cm4gbmV3IGNvbnN0cnVjdG9yRm4oLi4uYXJncyk7XG4gICAgICB2YXIgaW5zdGFuY2UgPSBuZXcgY29uc3RydWN0b3JGbiguLi5hcmdzKTtcbiAgICAgIGZvciAodmFyIGtleSBpbiBpbnN0YW5jZSkge1xuICAgICAgICBpbnN0YW5jZVtrZXldID0gaW5zdGFuY2Vba2V5XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpbnN0YW5jZTtcbiAgICB9KTtcblxuICAgIHJldHVybiBmYWN0b3J5QXJyYXk7XG4gIH1cblxuICAvKipcbiAgICogQ2xvbmUgYSBmdW5jdGlvblxuICAgKiBAcGFyYW0gb3JpZ2luYWxcbiAgICogQHJldHVybnMge0Z1bmN0aW9ufVxuICAgKi9cbiAgZnVuY3Rpb24gX2Nsb25lRnVuY3Rpb24ob3JpZ2luYWwpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZSBhbiBvYmplY3QncyBtZXRob2Qgd2l0aCBhIG5ldyBvbmUgc3BlY2lmaWVkIGJ5IGBjYWxsYmFja2AuXG4gICAqIEBwYXJhbSBvYmplY3RcbiAgICogQHBhcmFtIG1ldGhvZE5hbWVcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqL1xuICBmdW5jdGlvbiBfb3ZlcnJpZGUob2JqZWN0LCBtZXRob2ROYW1lLCBjYWxsYmFjaykge1xuICAgIG9iamVjdFttZXRob2ROYW1lXSA9IGNhbGxiYWNrKG9iamVjdFttZXRob2ROYW1lXSlcbiAgfVxuXG59XG4iLCIvKipcbiAqIENyZWF0ZWQgYnkga2xpbmcgb24gNy84LzE2LlxuICovXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBsYXllclNlcnZpY2Uge1xuXG4gIHN0YXRpYyBnZXQgJGluamVjdCgpIHtcbiAgICByZXR1cm4gW1xuICAgICAgJyRodHRwJyxcbiAgICAgICckcSdcbiAgICBdO1xuICB9XG5cbiAgY29uc3RydWN0b3IoJGh0dHAsICRxKSB7XG4gICAgdGhpcy4kaHR0cCA9ICRodHRwO1xuICAgIHRoaXMuJHEgPSAkcTtcbiAgICB0aGlzLmRiID0gZmlyZWJhc2UuZGF0YWJhc2UoKTtcbiAgICB0aGlzLnBsYXllcnMgPSBbXTtcbiAgICB0aGlzLmFjdGl2ZVBsYXllciA9IG51bGw7XG4gICAgdGhpcy5faW5pdGlhbGl6ZVBsYXllcnMoKTtcbiAgfVxuXG4gIF9pbml0aWFsaXplUGxheWVycygpIHtcbiAgICBjb25zb2xlLmxvZygnR2V0dGluZyBhbGwgcGxheWVycycpO1xuICAgIHRoaXMuJHEud2hlbih0aGlzLmdldEFsbFBsYXllcnMoKSlcbiAgICAgIC50aGVuKHBsYXllcnMgPT4ge1xuICAgICAgICBjb25zdCBfcGxheWVycyA9IFtdO1xuICAgICAgICBPYmplY3Qua2V5cyhwbGF5ZXJzKVxuICAgICAgICAgIC5mb3JFYWNoKHBsYXllcktleSA9PiB7XG4gICAgICAgICAgICBfcGxheWVycy5wdXNoKHBsYXllcnNbcGxheWVyS2V5XSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucGxheWVycyA9IF9wbGF5ZXJzO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnBsYXllcnMpO1xuICAgICAgfSk7XG4gIH1cblxuICBnZXRBbGxQbGF5ZXJzKCkge1xuICAgIHJldHVybiB0aGlzLmRiLnJlZigpXG4gICAgICAuY2hpbGQoJ3BsYXllcnMnKVxuICAgICAgLm9uY2UoJ3ZhbHVlJylcbiAgICAgIC50aGVuKHNuYXBzaG90ID0+IHNuYXBzaG90LnZhbCgpKTtcbiAgfVxuXG4gIHNhdmVQbGF5ZXIocGF5bG9hZCkge1xuICAgIC8vIEdldCBhIGtleSBmb3IgYSBuZXcgUG9zdC5cbiAgICBjb25zdCB1c2VyS2V5ID0gdGhpcy5kYi5yZWYoKVxuICAgICAgLmNoaWxkKCdwbGF5ZXJzJylcbiAgICAgIC5wdXNoKClcbiAgICAgIC5rZXk7XG4gICAgcGF5bG9hZC5fa2V5ID0gdXNlcktleTtcblxuICAgIC8vIFdyaXRlIHRoZSBuZXcgcG9zdCdzIGRhdGEgc2ltdWx0YW5lb3VzbHkgaW4gdGhlIHBvc3RzIGxpc3QgYW5kIHRoZSB1c2VyJ3MgcG9zdCBsaXN0LlxuICAgIGNvbnN0IHVwZGF0ZXMgPSB7fTtcbiAgICB1cGRhdGVzWycvcGxheWVycy8nICsgdXNlcktleV0gPSBwYXlsb2FkO1xuXG4gICAgcmV0dXJuIHRoaXMuZGIucmVmKClcbiAgICAgIC51cGRhdGUodXBkYXRlcyk7XG4gIH1cblxuICBzZWFyY2hQbGF5ZXIoYmF0dGxldGFnKSB7XG4gICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6IHRoaXMuX2dldEFwaVJvdXRlKGJhdHRsZXRhZyksXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcbiAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmVycm9yICE9IG51bGwgJiYgcmVzcG9uc2UuZXJyb3IgPT09IDQwNCkge1xuICAgICAgICAgIHJldHVybiBjb25zb2xlLmVycm9yKCdObyBzdWNoIGJhdHRsZSB0YWcnKTtcbiAgICAgICAgICAvLyBnaXZlIHVpIGZlZWRiYWNrXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXlsb2FkID0gcmVzcG9uc2UuZGF0YS5kYXRhO1xuICAgICAgICBwYXlsb2FkLmJhdHRsZXRhZyA9IGJhdHRsZXRhZztcbiAgICAgICAgLy90aGlzLnBsYXllcnMucHVzaChyZXNwb25zZS5kYXRhLmRhdGEpO1xuICAgICAgICB0aGlzLmFjdGl2ZVBsYXllciA9IHBheWxvYWQ7XG4gICAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgICAgICAvL3JldHVybiB0aGlzLnNhdmVQbGF5ZXIocGF5bG9hZCk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgX2dldEFwaVJvdXRlKGJhdHRsZXRhZykge1xuICAgIHJldHVybiBgaHR0cHM6Ly9hcGkubG9vdGJveC5ldS9wYy9ldS8ke2JhdHRsZXRhZy5yZXBsYWNlKCcjJywgJy0nKX0vcHJvZmlsZWA7XG4gIH1cblxufVxuIl19
