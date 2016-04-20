/**
 * @author dharam
 */
'use strict';
(function () {
    angular
        .module('PortManApp')
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'views/home/home.view.html',
                    controller: 'HomeController',
                    controllerAs: 'model',
                    resolve: {
                        loggedin: getLoggedInUser
                    }
                })
                .when('/searchResults', {
                    templateUrl: 'views/search/searchResult.view.html',
                    controller: 'SearchResultController',
                    controllerAs: 'model',
                    resolve: {
                        loggedin: getLoggedInUser
                    }
                })
                .when('/stock/:code', {
                    templateUrl: 'views/stock/stock.view.html',
                    controller: 'StockController',
                    controllerAs: 'model',
                    resolve: {
                        loggedin: getLoggedInUser
                    }
                })
                .when('/stock/:code/messageboard', {
                    templateUrl: 'views/stock/messageboard.view.html',
                    controller: 'MessageBoardController',
                    controllerAs: 'model',
                    resolve: {
                        loggedin: getLoggedInUser
                    }
                })
                .when('/portfolio/:userId', {
                    templateUrl: 'views/portfolio/portfolio.view.html',
                    controller: 'PortfolioController',
                    controllerAs: 'model',
                    resolve: {
                        loggedin: checkLoggedin
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
                .when('/profile/:userId', {
                    templateUrl: 'views/user/profile.view.html',
                    controller: 'ProfileController',
                    controllerAs: 'model',
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/people', {
                    templateUrl: 'views/people/people.view.html',
                    controller: 'PeopleController',
                    controllerAs: 'model',
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/blog/:blogId', {
                    templateUrl: 'views/blog/blog.view.html',
                    controller: 'BlogController',
                    controllerAs: 'model',
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/blogs', {
                    templateUrl: 'views/blog/blogs.view.html',
                    controller: 'BlogsController',
                    controllerAs: 'model',
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/blogs/:userId', {
                    templateUrl: 'views/blog/blogs.view.html',
                    controller: 'BlogsController',
                    controllerAs: 'model',
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/createBlog', {
                    templateUrl: 'views/blog/createBlog.view.html',
                    controller: 'CreateBlogController',
                    controllerAs: 'model',
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .when('/editBlog/:blogId', {
                    templateUrl: 'views/blog/editBlog.view.html',
                    controller: 'EditBlogController',
                    controllerAs: 'model',
                    resolve: {
                        loggedin: checkLoggedin
                    }
                })
                .otherwise({
                    redirectsTo: '/'
                });
        });

    var checkLoggedin = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                $rootScope.user = user;
                deferred.resolve();
            }
            // User is Not Authenticated
            else {
                $rootScope.error = 'You need to log in.';
                deferred.reject();
                $location.url('/');
            }
        });

        return deferred.promise;
    };

    var getLoggedInUser = function ($q, $timeout, $http, $location, $rootScope) {
        var deferred = $q.defer();

        $http.get('/api/project/loggedin').success(function (user) {
            $rootScope.errorMessage = null;
            // User is Authenticated
            if (user !== '0') {
                $rootScope.user = user;
            }
            deferred.resolve();
        });

        return deferred.promise;
    };

})();
