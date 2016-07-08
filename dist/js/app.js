(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _appController = require('./controllers/app-controller');

var _appController2 = _interopRequireDefault(_appController);

var _userController = require('./controllers/user-controller');

var _userController2 = _interopRequireDefault(_userController);

var _userService = require('./services/user-service');

var _userService2 = _interopRequireDefault(_userService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _module = angular.module('phOverwatch', ['ui.router', 'ngMaterial']);

// ##############################
//          controllers
// ##############################

_module.controller('AppController', _appController2.default);
_module.controller('UserController', _userController2.default);

// ##############################
//           services
// ##############################

_module.service('UserService', _userService2.default);

// ##############################
//         configuration
// ##############################

_module.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

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

},{"./controllers/app-controller":2,"./controllers/user-controller":3,"./services/user-service":4}],2:[function(require,module,exports){
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
/**
 * Created by kling on 7/8/16.
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserController = function () {
    _createClass(UserController, null, [{
        key: '$inject',
        get: function get() {
            return ['$scope', 'UserService'];
        }
    }]);

    function UserController($scope, userService) {
        _classCallCheck(this, UserController);

        this.$scope = $scope;
        this._userService = userService;
        this.player = '';
        this.players = [];
        this._initializeUsers();
    }

    _createClass(UserController, [{
        key: '_initializeUsers',
        value: function _initializeUsers() {
            var _this = this;

            this._userService.getAllPlayers().then(function (players) {
                var _players = [];
                Object.keys(players).forEach(function (playerKey) {
                    _players.push(players[playerKey]);
                });
                _this.players = _players;
                _this.$scope.$apply();
            });
        }
    }, {
        key: 'searchPlayer',
        value: function searchPlayer(battletag) {
            var _this2 = this;

            this._userService.searchPlayer(battletag).then(function (response) {
                if (response && response.error != null && response.error === 404) {
                    return console.error('No such battle tag');
                    // give ui feedback
                }

                var payload = response.data.data;
                payload.battletag = battletag;
                _this2.players.push(response.data.data);
                return _this2._userService.savePlayer(payload);
            }).catch(function (err) {
                console.error(err);
                _this2.players.splice(-1, 1);
            });
        }
    }, {
        key: 'getPlayerProfileUrl',
        value: function getPlayerProfileUrl(player) {
            return 'http://masteroverwatch.com/profile/pc/eu/' + player.battletag.replace('#', '-');
        }
    }]);

    return UserController;
}();

exports.default = UserController;

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

var UserService = function () {
    _createClass(UserService, null, [{
        key: '$inject',
        get: function get() {
            return ['$http'];
        }
    }]);

    function UserService($http) {
        _classCallCheck(this, UserService);

        this.$http = $http;
        this.db = firebase.database();
    }

    _createClass(UserService, [{
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
            return this.$http({
                method: 'GET',
                url: this._getApiRoute(battletag),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
        }
    }, {
        key: '_getApiRoute',
        value: function _getApiRoute(battletag) {
            return 'https://api.lootbox.eu/pc/eu/' + battletag.replace('#', '-') + '/profile';
        }
    }]);

    return UserService;
}();

exports.default = UserService;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvYXBwLmpzIiwiYXBwL2pzL2NvbnRyb2xsZXJzL2FwcC1jb250cm9sbGVyLmpzIiwiYXBwL2pzL2NvbnRyb2xsZXJzL3VzZXItY29udHJvbGxlci5qcyIsImFwcC9qcy9zZXJ2aWNlcy91c2VyLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFXQTs7OztBQUNBOzs7O0FBU0E7Ozs7OztBQW5CQSxJQUFNLFVBQVMsUUFBUSxNQUFSLENBQWUsYUFBZixFQUE4QixDQUN6QyxXQUR5QyxFQUV6QyxZQUZ5QyxDQUE5QixDQUFmOzs7Ozs7QUFZQSxRQUFPLFVBQVAsQ0FBa0IsZUFBbEI7QUFDQSxRQUFPLFVBQVAsQ0FBa0IsZ0JBQWxCOzs7Ozs7QUFRQSxRQUFPLE9BQVAsQ0FBZSxhQUFmOzs7Ozs7QUFNQSxRQUFPLE1BQVAsQ0FBYyxDQUFDLGdCQUFELEVBQW1CLG9CQUFuQixFQUF5QyxVQUFVLGNBQVYsRUFBMEIsa0JBQTFCLEVBQThDOztBQUVqRyx1QkFBbUIsSUFBbkIsQ0FBd0IsRUFBeEIsRUFBNEIsYUFBNUI7QUFDQSx1QkFBbUIsSUFBbkIsQ0FBd0IsR0FBeEIsRUFBNkIsYUFBN0I7QUFDQSx1QkFBbUIsU0FBbkIsQ0FBNkIsYUFBN0I7O0FBRUEsbUJBQWUsS0FBZixDQUFxQixNQUFyQixFQUE2QjtBQUN6QixrQkFBVSxJQURlO0FBRXpCLGFBQUssT0FGb0I7QUFHekIscUJBQWE7QUFIWSxLQUE3Qjs7QUFNQSxtQkFBZSxLQUFmLENBQXFCLFlBQXJCLEVBQW1DO0FBQy9CLGFBQUssUUFEMEI7QUFFL0IscUJBQWEsMEJBRmtCO0FBRy9CLG9CQUFZO0FBSG1CLEtBQW5DO0FBTUgsQ0FsQmEsQ0FBZDs7O0FDN0JBOzs7Ozs7OztJQUVxQixhLEdBQ2pCLHlCQUFjO0FBQUE7O0FBQ1YsU0FBSyxPQUFMLEdBQWUsY0FBZjtBQUNILEM7O2tC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RUwsOEJBQVU7QUFGTDtBQUhLLGFBQVgsQ0FBUDtBQVFIOzs7cUNBRVksUyxFQUFXO0FBQ3BCLHFEQUF1QyxVQUFVLE9BQVYsQ0FBa0IsR0FBbEIsRUFBdUIsR0FBdkIsQ0FBdkM7QUFDSDs7Ozs7O2tCQTVDZ0IsVyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG1vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKCdwaE92ZXJ3YXRjaCcsIFtcbiAgICAndWkucm91dGVyJyxcbiAgICAnbmdNYXRlcmlhbCdcbl0pO1xuXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vICAgICAgICAgIGNvbnRyb2xsZXJzXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxuaW1wb3J0IEFwcENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9hcHAtY29udHJvbGxlcic7XG5pbXBvcnQgVXNlckNvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy91c2VyLWNvbnRyb2xsZXInO1xuXG5tb2R1bGUuY29udHJvbGxlcignQXBwQ29udHJvbGxlcicsIEFwcENvbnRyb2xsZXIpO1xubW9kdWxlLmNvbnRyb2xsZXIoJ1VzZXJDb250cm9sbGVyJywgVXNlckNvbnRyb2xsZXIpO1xuXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcbi8vICAgICAgICAgICBzZXJ2aWNlc1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmltcG9ydCBVc2VyU2VydmljZSBmcm9tICcuL3NlcnZpY2VzL3VzZXItc2VydmljZSc7XG5cbm1vZHVsZS5zZXJ2aWNlKCdVc2VyU2VydmljZScsIFVzZXJTZXJ2aWNlKTtcblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4vLyAgICAgICAgIGNvbmZpZ3VyYXRpb25cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5tb2R1bGUuY29uZmlnKFtcIiRzdGF0ZVByb3ZpZGVyXCIsIFwiJHVybFJvdXRlclByb3ZpZGVyXCIsIGZ1bmN0aW9uICgkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XG5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIud2hlbihcIlwiLCBcIi9ob21lL3VzZXJzXCIpO1xuICAgICR1cmxSb3V0ZXJQcm92aWRlci53aGVuKFwiL1wiLCBcIi9ob21lL3VzZXJzXCIpO1xuICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoXCIvaG9tZS91c2Vyc1wiKTtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgdXJsOiAnL2hvbWUnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2hvbWUuaHRtbCdcbiAgICB9KTtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lLnVzZXJzJywge1xuICAgICAgICB1cmw6ICcvdXNlcnMnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy91c2Vycy50cGwuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdVc2VyQ29udHJvbGxlciBhcyBjdHJsJ1xuICAgIH0pO1xuXG59XSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5hcHBOYW1lID0gJ3BoLU92ZXJ3YXRjaCc7XG4gICAgfVxufSIsIi8qKlxuICogQ3JlYXRlZCBieSBrbGluZyBvbiA3LzgvMTYuXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlckNvbnRyb2xsZXIge1xuXG4gICAgc3RhdGljIGdldCAkaW5qZWN0KCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgJyRzY29wZScsXG4gICAgICAgICAgICAnVXNlclNlcnZpY2UnXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoJHNjb3BlLCB1c2VyU2VydmljZSkge1xuICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgdGhpcy5fdXNlclNlcnZpY2UgPSB1c2VyU2VydmljZTtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSAnJztcbiAgICAgICAgdGhpcy5wbGF5ZXJzID0gW107XG4gICAgICAgIHRoaXMuX2luaXRpYWxpemVVc2VycygpO1xuICAgIH1cblxuICAgIF9pbml0aWFsaXplVXNlcnMoKSB7XG4gICAgICAgIHRoaXMuX3VzZXJTZXJ2aWNlXG4gICAgICAgICAgICAuZ2V0QWxsUGxheWVycygpXG4gICAgICAgICAgICAudGhlbihwbGF5ZXJzID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBfcGxheWVycyA9IFtdO1xuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKHBsYXllcnMpLmZvckVhY2gocGxheWVyS2V5ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgX3BsYXllcnMucHVzaChwbGF5ZXJzW3BsYXllcktleV0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVycyA9IF9wbGF5ZXJzO1xuICAgICAgICAgICAgICAgIHRoaXMuJHNjb3BlLiRhcHBseSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2VhcmNoUGxheWVyKGJhdHRsZXRhZykge1xuICAgICAgICB0aGlzLl91c2VyU2VydmljZVxuICAgICAgICAgICAgLnNlYXJjaFBsYXllcihiYXR0bGV0YWcpXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLmVycm9yICE9IG51bGwgJiYgcmVzcG9uc2UuZXJyb3IgPT09IDQwNCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29uc29sZS5lcnJvcignTm8gc3VjaCBiYXR0bGUgdGFnJyk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGdpdmUgdWkgZmVlZGJhY2tcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCBwYXlsb2FkID0gcmVzcG9uc2UuZGF0YS5kYXRhO1xuICAgICAgICAgICAgICAgIHBheWxvYWQuYmF0dGxldGFnID0gYmF0dGxldGFnO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVycy5wdXNoKHJlc3BvbnNlLmRhdGEuZGF0YSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3VzZXJTZXJ2aWNlLnNhdmVQbGF5ZXIocGF5bG9hZCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVycy5zcGxpY2UoLTEsIDEpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0UGxheWVyUHJvZmlsZVVybChwbGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuIGBodHRwOi8vbWFzdGVyb3ZlcndhdGNoLmNvbS9wcm9maWxlL3BjL2V1LyR7cGxheWVyLmJhdHRsZXRhZy5yZXBsYWNlKCcjJywgJy0nKX1gO1xuICAgIH1cblxufSIsIi8qKlxuICogQ3JlYXRlZCBieSBrbGluZyBvbiA3LzgvMTYuXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlclNlcnZpY2Uge1xuXG4gICAgc3RhdGljIGdldCAkaW5qZWN0KCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgJyRodHRwJ1xuICAgICAgICBdO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCRodHRwKSB7XG4gICAgICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcbiAgICAgICAgdGhpcy5kYiA9IGZpcmViYXNlLmRhdGFiYXNlKCk7XG4gICAgfVxuXG4gICAgZ2V0QWxsUGxheWVycygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGIucmVmKCkuY2hpbGQoJ3BsYXllcnMnKS5vbmNlKCd2YWx1ZScpLnRoZW4oZnVuY3Rpb24oc25hcHNob3QpIHtcbiAgICAgICAgICAgIHJldHVybiBzbmFwc2hvdC52YWwoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2F2ZVBsYXllcihwYXlsb2FkKSB7XG4gICAgICAgIC8vIEdldCBhIGtleSBmb3IgYSBuZXcgUG9zdC5cbiAgICAgICAgY29uc3QgdXNlcktleSA9IHRoaXMuZGIucmVmKCkuY2hpbGQoJ3BsYXllcnMnKS5wdXNoKCkua2V5O1xuICAgICAgICBwYXlsb2FkLl9rZXkgPSB1c2VyS2V5O1xuXG4gICAgICAgIC8vIFdyaXRlIHRoZSBuZXcgcG9zdCdzIGRhdGEgc2ltdWx0YW5lb3VzbHkgaW4gdGhlIHBvc3RzIGxpc3QgYW5kIHRoZSB1c2VyJ3MgcG9zdCBsaXN0LlxuICAgICAgICBjb25zdCB1cGRhdGVzID0ge307XG4gICAgICAgIHVwZGF0ZXNbJy9wbGF5ZXJzLycgKyB1c2VyS2V5XSA9IHBheWxvYWQ7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZGIucmVmKCkudXBkYXRlKHVwZGF0ZXMpO1xuICAgIH1cblxuICAgIHNlYXJjaFBsYXllcihiYXR0bGV0YWcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGh0dHAoe1xuICAgICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICAgIHVybDogdGhpcy5fZ2V0QXBpUm91dGUoYmF0dGxldGFnKSxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgICAgICdBY2NlcHQnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgX2dldEFwaVJvdXRlKGJhdHRsZXRhZykge1xuICAgICAgICByZXR1cm4gYGh0dHBzOi8vYXBpLmxvb3Rib3guZXUvcGMvZXUvJHtiYXR0bGV0YWcucmVwbGFjZSgnIycsICctJyl9L3Byb2ZpbGVgO1xuICAgIH1cblxufSJdfQ==
