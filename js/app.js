(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _appController = require('./controllers/app-controller');

var _appController2 = _interopRequireDefault(_appController);

var _userController = require('./controllers/user-controller');

var _userController2 = _interopRequireDefault(_userController);

var _userService = require('./services/user-service');

var _userService2 = _interopRequireDefault(_userService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _module = angular.module('phOverwatch', ['ui.router']);

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
            return ['UserService'];
        }
    }]);

    function UserController(userService) {
        _classCallCheck(this, UserController);

        this._userService = userService;

        this.users = [];
    }

    _createClass(UserController, [{
        key: 'searchUser',
        value: function searchUser(battletag) {
            var _this = this;

            this._userService.searchUser(battletag).then(function (response) {
                if (response && response.error != null && response.error === 404) {
                    return console.error('No such battle tag');
                    // give ui feedback
                }

                _this.users.push(response.battletag);
            });
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
    }

    _createClass(UserService, [{
        key: 'searchUser',
        value: function searchUser(battletag) {
            return this.$http.get(this._getApiRoute(battletag));
        }
    }, {
        key: '_getApiRoute',
        value: function _getApiRoute(battletag) {
            return 'https://owapi.net/api/v2/u/' + battletag.replace('#', '-') + '/stats/general';
        }
    }]);

    return UserService;
}();

exports.default = UserService;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvYXBwLmpzIiwiYXBwL2pzL2NvbnRyb2xsZXJzL2FwcC1jb250cm9sbGVyLmpzIiwiYXBwL2pzL2NvbnRyb2xsZXJzL3VzZXItY29udHJvbGxlci5qcyIsImFwcC9qcy9zZXJ2aWNlcy91c2VyLXNlcnZpY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUFVQTs7OztBQUNBOzs7O0FBU0E7Ozs7OztBQWxCQSxJQUFNLFVBQVMsUUFBUSxNQUFSLENBQWUsYUFBZixFQUE4QixDQUN6QyxXQUR5QyxDQUE5QixDQUFmOzs7Ozs7QUFXQSxRQUFPLFVBQVAsQ0FBa0IsZUFBbEI7QUFDQSxRQUFPLFVBQVAsQ0FBa0IsZ0JBQWxCOzs7Ozs7QUFRQSxRQUFPLE9BQVAsQ0FBZSxhQUFmOzs7Ozs7QUFNQSxRQUFPLE1BQVAsQ0FBYyxDQUFDLGdCQUFELEVBQW1CLG9CQUFuQixFQUF5QyxVQUFVLGNBQVYsRUFBMEIsa0JBQTFCLEVBQThDOztBQUVqRyx1QkFBbUIsSUFBbkIsQ0FBd0IsRUFBeEIsRUFBNEIsYUFBNUI7QUFDQSx1QkFBbUIsSUFBbkIsQ0FBd0IsR0FBeEIsRUFBNkIsYUFBN0I7QUFDQSx1QkFBbUIsU0FBbkIsQ0FBNkIsYUFBN0I7O0FBRUEsbUJBQWUsS0FBZixDQUFxQixNQUFyQixFQUE2QjtBQUN6QixrQkFBVSxJQURlO0FBRXpCLGFBQUssT0FGb0I7QUFHekIscUJBQWE7QUFIWSxLQUE3Qjs7QUFNQSxtQkFBZSxLQUFmLENBQXFCLFlBQXJCLEVBQW1DO0FBQy9CLGFBQUssUUFEMEI7QUFFL0IscUJBQWEsMEJBRmtCO0FBRy9CLG9CQUFZO0FBSG1CLEtBQW5DO0FBTUgsQ0FsQmEsQ0FBZDs7O0FDNUJBOzs7Ozs7OztJQUVxQixhLEdBQ2pCLHlCQUFjO0FBQUE7O0FBQ1YsU0FBSyxPQUFMLEdBQWUsY0FBZjtBQUNILEM7O2tCQUhnQixhOzs7Ozs7QUNDckI7Ozs7Ozs7Ozs7SUFFcUIsYzs7OzRCQUVJO0FBQ2pCLG1CQUFPLENBQ0gsYUFERyxDQUFQO0FBR0g7OztBQUVELDRCQUFZLFdBQVosRUFBeUI7QUFBQTs7QUFDckIsYUFBSyxZQUFMLEdBQW9CLFdBQXBCOztBQUVBLGFBQUssS0FBTCxHQUFhLEVBQWI7QUFDSDs7OzttQ0FFVSxTLEVBQVc7QUFBQTs7QUFDbEIsaUJBQUssWUFBTCxDQUFrQixVQUFsQixDQUE2QixTQUE3QixFQUF3QyxJQUF4QyxDQUE2QyxvQkFBWTtBQUNyRCxvQkFBSSxZQUFZLFNBQVMsS0FBVCxJQUFrQixJQUE5QixJQUFzQyxTQUFTLEtBQVQsS0FBbUIsR0FBN0QsRUFBa0U7QUFDOUQsMkJBQU8sUUFBUSxLQUFSLENBQWMsb0JBQWQsQ0FBUDs7QUFFSDs7QUFFRCxzQkFBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixTQUFTLFNBQXpCO0FBQ0gsYUFQRDtBQVFIOzs7Ozs7a0JBdkJnQixjOzs7Ozs7QUNGckI7Ozs7Ozs7Ozs7SUFFcUIsVzs7OzRCQUVJO0FBQ2pCLG1CQUFPLENBQ0gsT0FERyxDQUFQO0FBR0g7OztBQUVELHlCQUFZLEtBQVosRUFBbUI7QUFBQTs7QUFDZixhQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0g7Ozs7bUNBRVUsUyxFQUFXO0FBQ2xCLG1CQUFPLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZSxLQUFLLFlBQUwsQ0FBa0IsU0FBbEIsQ0FBZixDQUFQO0FBQ0g7OztxQ0FFWSxTLEVBQVc7QUFDcEIsbURBQXFDLFVBQVUsT0FBVixDQUFrQixHQUFsQixFQUF1QixHQUF2QixDQUFyQztBQUNIOzs7Ozs7a0JBbEJnQixXIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BoT3ZlcndhdGNoJywgW1xuICAgICd1aS5yb3V0ZXInXG5dKTtcblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4vLyAgICAgICAgICBjb250cm9sbGVyc1xuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG5cbmltcG9ydCBBcHBDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvYXBwLWNvbnRyb2xsZXInO1xuaW1wb3J0IFVzZXJDb250cm9sbGVyIGZyb20gJy4vY29udHJvbGxlcnMvdXNlci1jb250cm9sbGVyJztcblxubW9kdWxlLmNvbnRyb2xsZXIoJ0FwcENvbnRyb2xsZXInLCBBcHBDb250cm9sbGVyKTtcbm1vZHVsZS5jb250cm9sbGVyKCdVc2VyQ29udHJvbGxlcicsIFVzZXJDb250cm9sbGVyKTtcblxuLy8gIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjXG4vLyAgICAgICAgICAgc2VydmljZXNcbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuXG5pbXBvcnQgVXNlclNlcnZpY2UgZnJvbSAnLi9zZXJ2aWNlcy91c2VyLXNlcnZpY2UnO1xuXG5tb2R1bGUuc2VydmljZSgnVXNlclNlcnZpY2UnLCBVc2VyU2VydmljZSk7XG5cbi8vICMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjI1xuLy8gICAgICAgICBjb25maWd1cmF0aW9uXG4vLyAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyNcblxubW9kdWxlLmNvbmZpZyhbXCIkc3RhdGVQcm92aWRlclwiLCBcIiR1cmxSb3V0ZXJQcm92aWRlclwiLCBmdW5jdGlvbiAoJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlcikge1xuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLndoZW4oXCJcIiwgXCIvaG9tZS91c2Vyc1wiKTtcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIud2hlbihcIi9cIiwgXCIvaG9tZS91c2Vyc1wiKTtcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiL2hvbWUvdXNlcnNcIik7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnaG9tZScsIHtcbiAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgIHVybDogJy9ob21lJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd2aWV3cy9ob21lLmh0bWwnXG4gICAgfSk7XG5cbiAgICAkc3RhdGVQcm92aWRlci5zdGF0ZSgnaG9tZS51c2VycycsIHtcbiAgICAgICAgdXJsOiAnL3VzZXJzJyxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICd0ZW1wbGF0ZXMvdXNlcnMudHBsLmh0bWwnLFxuICAgICAgICBjb250cm9sbGVyOiAnVXNlckNvbnRyb2xsZXIgYXMgY3RybCdcbiAgICB9KTtcblxufV0pOyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXBwQ29udHJvbGxlciB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMuYXBwTmFtZSA9ICdwaC1PdmVyd2F0Y2gnO1xuICAgIH1cbn0iLCIvKipcbiAqIENyZWF0ZWQgYnkga2xpbmcgb24gNy84LzE2LlxuICovXG4ndXNlIHN0cmljdCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVzZXJDb250cm9sbGVyIHtcblxuICAgIHN0YXRpYyBnZXQgJGluamVjdCgpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICdVc2VyU2VydmljZSdcbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcih1c2VyU2VydmljZSkge1xuICAgICAgICB0aGlzLl91c2VyU2VydmljZSA9IHVzZXJTZXJ2aWNlO1xuXG4gICAgICAgIHRoaXMudXNlcnMgPSBbXTtcbiAgICB9XG5cbiAgICBzZWFyY2hVc2VyKGJhdHRsZXRhZykge1xuICAgICAgICB0aGlzLl91c2VyU2VydmljZS5zZWFyY2hVc2VyKGJhdHRsZXRhZykudGhlbihyZXNwb25zZSA9PiB7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UgJiYgcmVzcG9uc2UuZXJyb3IgIT0gbnVsbCAmJiByZXNwb25zZS5lcnJvciA9PT0gNDA0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbnNvbGUuZXJyb3IoJ05vIHN1Y2ggYmF0dGxlIHRhZycpO1xuICAgICAgICAgICAgICAgIC8vIGdpdmUgdWkgZmVlZGJhY2tcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy51c2Vycy5wdXNoKHJlc3BvbnNlLmJhdHRsZXRhZyk7XG4gICAgICAgIH0pO1xuICAgIH1cblxufSIsIi8qKlxuICogQ3JlYXRlZCBieSBrbGluZyBvbiA3LzgvMTYuXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVXNlclNlcnZpY2Uge1xuXG4gICAgc3RhdGljIGdldCAkaW5qZWN0KCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgJyRodHRwJ1xuICAgICAgICBdO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKCRodHRwKSB7XG4gICAgICAgIHRoaXMuJGh0dHAgPSAkaHR0cDtcbiAgICB9XG5cbiAgICBzZWFyY2hVc2VyKGJhdHRsZXRhZykge1xuICAgICAgICByZXR1cm4gdGhpcy4kaHR0cC5nZXQodGhpcy5fZ2V0QXBpUm91dGUoYmF0dGxldGFnKSk7XG4gICAgfVxuXG4gICAgX2dldEFwaVJvdXRlKGJhdHRsZXRhZykge1xuICAgICAgICByZXR1cm4gYGh0dHBzOi8vb3dhcGkubmV0L2FwaS92Mi91LyR7YmF0dGxldGFnLnJlcGxhY2UoJyMnLCAnLScpfS9zdGF0cy9nZW5lcmFsYDtcbiAgICB9XG5cbn0iXX0=
