/**
 * @author dharam
 */
'use strict';
(function () {
    angular
        .module('PortManApp')
        .controller('ProfileController', ProfileController);

    function ProfileController($rootScope, $location, $routeParams, UserService, PortfolioService, CommentService, RecommendationService) {
        var vm = this;
        vm.showSuccessAlert = false;
        vm.user = $rootScope.user;

        vm.userId = $routeParams.userId;
        vm.isSelf = true;

        // Event Handler Declaration
        vm.update = update;
        vm.updateProfilePic = updateProfilePic;

        init();
        function init() {
            if (vm.user._id !== vm.userId) {
                vm.isSelf = false;
                UserService.findById(vm.userId)
                    .then(
                        function (response) {
                            vm.user = response.data;
                        },
                        function (err) {
                            console.log(err);
                        }
                    );
            }
            vm.invTotal = 0;
            vm.currentTotal = 0;
            PortfolioService.getPortfolio(vm.userId)
                .then(function (portfolio) {
                    _.forEach(portfolio, function (stock) {
                        vm.invTotal += stock.invTotalNumber;
                        vm.currentTotal += stock.currentTotalNumber;
                    });
                    if (vm.currentTotal >= vm.invTotal) {
                        vm.profit = vm.currentTotal - vm.invTotal;
                        vm.profitPercentage = numeral(vm.profit / vm.invTotal).format('0.00%');
                        vm.profit = numeral(vm.profit).format('$0,0.00');
                    } else {
                        vm.loss = vm.invTotal - vm.currentTotal;
                        vm.lossPercentage = numeral(vm.loss / vm.invTotal).format('0.00%');
                        vm.loss = numeral(vm.loss).format('$0,0.00');
                    }
                    vm.invTotal = numeral(vm.invTotal).format('$0,0.00');
                    vm.currentTotal = numeral(vm.currentTotal).format('$0,0.00');
                    $('#portfolioPanel').removeClass('loading');
                }, function (err) {
                    console.log(err);
                });

            showAllCommentsForUser();
            showAllRecommendationsForUser();
        }

        function showAllCommentsForUser() {
            vm.userComments = [];
            CommentService.findCommentsByUserId(vm.userId)
                .then(
                    function (response) {
                        var comments = response.data,
                            userComments = [],
                            processedComments = [];
                        _.forEach(comments, function (comment) {
                            UserService.findById(comment.userId)
                                .then(function (response) {
                                    var user = response.data;
                                    processedComments.push(comment);
                                    _.extend(comment, {
                                        userFirstName: user.firstName,
                                        userLastName: user.lastName,
                                        timestamp: moment(comment.timestamp).format('MM/DD/YYYY HH:mm:SS')
                                    });
                                    if (user._id !== vm.userId) {
                                        userComments.push(comment);
                                    }
                                    if (processedComments.length === comments.length) {
                                        vm.userComments = _.sortBy(userComments, 'timestamp');
                                        $('#commentsPanel').removeClass('loading');
                                    }
                                }, function (err) {
                                    console.log(err);
                                });
                        });
                        if (comments.length === 0) {
                            vm.userComments = [];
                            $('#commentsPanel').removeClass('loading');
                        }
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }

        function showAllRecommendationsForUser() {
            vm.userRecommendations = [];
            RecommendationService.findRecommendationsByUserId(vm.userId)
                .then(
                    function (response) {
                        var recommendations = response.data,
                            userRecommendations = [];
                        _.forEach(recommendations, function (recommendation) {
                            UserService.findById(recommendation.by)
                                .then(function (response) {
                                    var user = response.data;
                                    _.extend(recommendation, {
                                        userFirstName: user.firstName,
                                        userLastName: user.lastName,
                                        userId: user._id,
                                        target: numeral(recommendation.target).format('$0,0.00')
                                    });
                                    userRecommendations.push(recommendation);
                                    if (userRecommendations.length === recommendations.length) {
                                        vm.userRecommendations = userRecommendations;
                                        $('#recommendationPanel').removeClass('loading');
                                    }
                                }, function (err) {
                                    console.log(err);
                                });
                        });
                        if (recommendations.length === 0) {
                            vm.userRecommendations = [];
                            $('#recommendationPanel').removeClass('loading');
                        }
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }

        function update(user) {
            UserService.updateUser(
                $rootScope.user._id,
                user
            ).then(function successCallback(response) {
                if (response.status === 200) {
                    $rootScope.user = user;
                    $location.path('/profile/' + $rootScope.user._id);
                    vm.showSuccessAlert = true;
                }
            });
        }

        function updateProfilePic() {
            if (vm.fileModel) {
                UserService.updateProfilePicture(
                    $rootScope.user._id,
                    vm.fileModel
                ).then(function successCallback(response) {
                    $rootScope.user.profilePicUrl = response.data;
                    vm.showProfilePicSuccessAlert = true;
                });
            }
        }
    }
})();
