(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _appController = require('./controllers/app-controller');

var _appController2 = _interopRequireDefault(_appController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _module = angular.module('phOverwatch', ['ui.router']);

_module.controller('AppController', _appController2.default);

_module.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.when("", "/home/users");
    $urlRouterProvider.when("/", "/home/users");

    // For any unmatched url, send to /home
    $urlRouterProvider.otherwise("/home/users");

    $stateProvider.state('home', {
        abstract: true,
        url: '/home',
        templateUrl: 'views/home.html',
        onEnter: function onEnter() {
            console.log("enter home");
        }
    });

    $stateProvider.state('home.users', {
        url: '/users',
        templateUrl: 'templates/users.tpl.html',
        onEnter: function onEnter() {
            console.log("enter users");
        }
    });
}]);

},{"./controllers/app-controller":2}],2:[function(require,module,exports){
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvanMvYXBwLmpzIiwiYXBwL2pzL2NvbnRyb2xsZXJzL2FwcC1jb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FBTUE7Ozs7OztBQUpBLElBQU0sVUFBUyxRQUFRLE1BQVIsQ0FBZSxhQUFmLEVBQThCLENBQ3pDLFdBRHlDLENBQTlCLENBQWY7O0FBTUEsUUFBTyxVQUFQLENBQWtCLGVBQWxCOztBQUVBLFFBQU8sTUFBUCxDQUFjLENBQUMsZ0JBQUQsRUFBbUIsb0JBQW5CLEVBQXlDLFVBQVUsY0FBVixFQUEwQixrQkFBMUIsRUFBOEM7O0FBRWpHLHVCQUFtQixJQUFuQixDQUF3QixFQUF4QixFQUE0QixhQUE1QjtBQUNBLHVCQUFtQixJQUFuQixDQUF3QixHQUF4QixFQUE2QixhQUE3Qjs7O0FBR0EsdUJBQW1CLFNBQW5CLENBQTZCLGFBQTdCOztBQUVBLG1CQUFlLEtBQWYsQ0FBcUIsTUFBckIsRUFBNkI7QUFDekIsa0JBQVUsSUFEZTtBQUV6QixhQUFLLE9BRm9CO0FBR3pCLHFCQUFhLGlCQUhZO0FBSXpCLGlCQUFTLG1CQUFVO0FBQ2Isb0JBQVEsR0FBUixDQUFZLFlBQVo7QUFDRDtBQU5vQixLQUE3Qjs7QUFTQSxtQkFBZSxLQUFmLENBQXFCLFlBQXJCLEVBQW1DO0FBQy9CLGFBQUssUUFEMEI7QUFFL0IscUJBQWEsMEJBRmtCO0FBRy9CLGlCQUFTLG1CQUFVO0FBQ2Isb0JBQVEsR0FBUixDQUFZLGFBQVo7QUFDRDtBQUwwQixLQUFuQztBQU9ILENBeEJhLENBQWQ7OztBQ1ZBOzs7Ozs7OztJQUVxQixhLEdBQ2pCLHlCQUFjO0FBQUE7O0FBQ1YsU0FBSyxPQUFMLEdBQWUsY0FBZjtBQUNILEM7O2tCQUhnQixhIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgbW9kdWxlID0gYW5ndWxhci5tb2R1bGUoJ3BoT3ZlcndhdGNoJywgW1xuICAgICd1aS5yb3V0ZXInXG5dKTtcblxuaW1wb3J0IEFwcENvbnRyb2xsZXIgZnJvbSAnLi9jb250cm9sbGVycy9hcHAtY29udHJvbGxlcic7XG5cbm1vZHVsZS5jb250cm9sbGVyKCdBcHBDb250cm9sbGVyJywgQXBwQ29udHJvbGxlcik7XG5cbm1vZHVsZS5jb25maWcoW1wiJHN0YXRlUHJvdmlkZXJcIiwgXCIkdXJsUm91dGVyUHJvdmlkZXJcIiwgZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIpIHtcblxuICAgICR1cmxSb3V0ZXJQcm92aWRlci53aGVuKFwiXCIsIFwiL2hvbWUvdXNlcnNcIik7XG4gICAgJHVybFJvdXRlclByb3ZpZGVyLndoZW4oXCIvXCIsIFwiL2hvbWUvdXNlcnNcIik7XG5cbiAgICAvLyBGb3IgYW55IHVubWF0Y2hlZCB1cmwsIHNlbmQgdG8gL2hvbWVcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKFwiL2hvbWUvdXNlcnNcIilcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lJywge1xuICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgdXJsOiAnL2hvbWUnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3ZpZXdzL2hvbWUuaHRtbCcsXG4gICAgICAgIG9uRW50ZXI6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZW50ZXIgaG9tZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICB9KTtcblxuICAgICRzdGF0ZVByb3ZpZGVyLnN0YXRlKCdob21lLnVzZXJzJywge1xuICAgICAgICB1cmw6ICcvdXNlcnMnLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3RlbXBsYXRlcy91c2Vycy50cGwuaHRtbCcsXG4gICAgICAgIG9uRW50ZXI6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZW50ZXIgdXNlcnNcIik7XG4gICAgICAgICAgICB9XG4gICAgfSk7XG59XSk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBcHBDb250cm9sbGVyIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5hcHBOYW1lID0gJ3BoLU92ZXJ3YXRjaCc7XG4gICAgfVxufSJdfQ==
