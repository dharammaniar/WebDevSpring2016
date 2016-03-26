'use strict';

(function(){
    angular
        .module('FormBuilderApp')
        .config(function($routeProvider) {
            $routeProvider
                .when("/", {
                    templateUrl: "views/home/home.view.html",
                    controller: 'HomeController',
                    controllerAs: 'model',
                    resolve: {
                        getLoggedInUser: getLoggedInUser
                    }
                })
                .when("/stock/:code", {
                    templateUrl: "views/stock/stock.view.html",
                    controller: 'StockController',
                    controllerAs: 'model',
                    resolve: {
                        getLoggedInUser: getLoggedInUser
                    }
                })
                .when("/searchResults", {
                    templateUrl: "views/search/searchResult.view.html",
                    controller: 'SearchResultController',
                    controllerAs: 'model',
                    resolve: {
                        getLoggedInUser: getLoggedInUser
                    }
                })
                .when("/register", {
                    templateUrl: "views/users/register.view.html",
                    controller: 'RegisterController',
                    controllerAs: 'model'
                })
                .when("/login", {
                    templateUrl: "views/users/login.view.html",
                    controller: 'LoginController',
                    controllerAs: 'model'
                })
                .when("/profile", {
                    templateUrl: "views/users/profile.view.html",
                    controller: 'ProfileController',
                    controllerAs: 'model',
                    resolve: {
                        verifyUserIsLoggedIn: verifyUserIsLoggedIn
                    }
                })
                .when("/portfolio", {
                    templateUrl: "views/portfolio/portfolio.view.html",
                    controller: 'PortfolioController',
                    controllerAs: 'model',
                    resolve: {
                        verifyUserIsLoggedIn: verifyUserIsLoggedIn
                    }
                })
                .when("/blogs", {
                    templateUrl: "views/blogs/blogs.view.html",
                    controller: 'BlogController',
                    controllerAs: 'model',
                    resolve: {
                        verifyUserIsLoggedIn: verifyUserIsLoggedIn
                    }
                })
                .when("/follows", {
                    templateUrl: "views/follows/follows.view.html",
                    controller: 'FollowsController',
                    controllerAs: 'model',
                    resolve: {
                        verifyUserIsLoggedIn: verifyUserIsLoggedIn
                    }
                })
                .when("/comments", {
                    templateUrl: "views/comments/comments.view.html",
                    controller: 'CommentController',
                    controllerAs: 'model',
                    resolve: {
                        verifyUserIsLoggedIn: verifyUserIsLoggedIn
                    }
                })
                .otherwise({
                    redirectsTo: "/"
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
