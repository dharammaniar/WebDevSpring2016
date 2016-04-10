/**
 * @author dharam
 */
'use strict';

(function(){
    angular
        .module('PortManApp')
        .config(function($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/home/home.view.html',
                    controller: 'HomeController',
                    controllerAs: 'model',
                    resolve: {
                        getLoggedInUser: getLoggedInUser
                    }
                })
                .when('/searchResults', {
                    templateUrl: 'views/search/searchResult.view.html',
                    controller: 'SearchResultController',
                    controllerAs: 'model',
                    resolve: {
                        getLoggedInUser: getLoggedInUser
                    }
                })
                .when('/stock/:code', {
                    templateUrl: 'views/stock/stock.view.html',
                    controller: 'StockController',
                    controllerAs: 'model',
                    resolve: {
                        getLoggedInUser: getLoggedInUser
                    }
                })
                .when('/register', {
                    templateUrl: 'views/user/register.view.html',
                    controller: 'RegisterController',
                    controllerAs: 'model'
                })
                .when('/login', {
                    templateUrl: 'views/user/login.view.html',
                    controller: 'LoginController',
                    controllerAs: 'model'
                })
                .when('/profile', {
                    templateUrl: 'views/user/profile.view.html',
                    controller: 'ProfileController',
                    controllerAs: 'model',
                    resolve: {
                        verifyUserIsLoggedIn: verifyUserIsLoggedIn
                    }
                })
                .otherwise({
                    redirectsTo: '/'
                });
        });

    function verifyUserIsLoggedIn(UserService, $q, $location, $rootScope) {
        var deferred = $q.defer();
        UserService.findLoggedInUser()
            .then(function (response){
                var currentUser = response.data;
                if(currentUser) {
                    $rootScope.user = currentUser;
                    deferred.resolve();
                } else {
                    deferred.reject();
                    $location.url("/");
                }
            });
        return deferred.promise;
    }

    function getLoggedInUser(UserService, $q, $rootScope) {
        var deferred = $q.defer();
        UserService.findLoggedInUser()
            .then(function (response){
                $rootScope.user = response.data;
                deferred.resolve();
            });
        return deferred.promise;
    }

})();
