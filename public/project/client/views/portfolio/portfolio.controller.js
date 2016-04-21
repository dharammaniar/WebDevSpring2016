/**
 * @author dharam
 */
'use strict';
(function () {
    angular
        .module('PortManApp')
        .controller('PortfolioController', PortfolioController);

    function PortfolioController($rootScope, $routeParams, PortfolioService, CommentService, UserService, StockService) {
        var vm = this;
        var allStocks = [''];

        // Event Handler Declaration
        vm.addStock = addStock;
        vm.updateStock = updateStock;
        vm.deleteStock = deleteStock;
        vm.selectStock = selectStock;
        vm.addComment = addComment;
        vm.updateStocks = updateStocks;
        vm.findStock = findStock;

        function init() {
            vm.userId = $routeParams.userId;
            vm.isSelf = $rootScope.user._id === vm.userId;
            if (vm.isSelf) {
                vm.userId = $rootScope.user._id;
            }
            vm.userStocks = [];
            showAllStocksForUser();
            showAllCommentsForUser();
            vm.allStocks = [''];
            getAllStocks();
        }

        init();

        function getAllStocks() {
            StockService.getAllStocks()
                .then(
                    function (response) {
                        var stocks = response.data;
                        _.forEach(stocks, function (stock) {
                            allStocks.push(stock.code + ' : ' + stock.company);
                        });
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }

        function updateStocks(searchTerm) {
            if (searchTerm.length > 0) {
                vm.allStocks = _.filter(allStocks, function (stock) {
                    return stock.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0;
                })
            }
        }

        function findStock(stock) {
            if (stock.indexOf(':') >= 1) {
                if (vm.selectedStock) {
                    vm.selectedStock.code = stock.split(':')[0].trim();
                } else {
                    vm.selectedStock = {
                        code: stock.split(':')[0].trim()
                    }
                }
            }
        }

        function showAllStocksForUser() {
            var firstProgress = true;
            PortfolioService.getPortfolio(vm.userId)
                .then(function (portfolio) {
                    vm.userStocks = portfolio;
                    delete vm.selectedStock;
                    delete vm.selectedStockIndex;
                    if ($rootScope.addToPortfolioCode) {
                        vm.selectedStock = {
                            code: $rootScope.addToPortfolioCode
                        };
                        delete $rootScope['addToPortfolioCode'];
                    }
                    _.forEach(portfolio, function (stock) {
                        $('#' + stock._id).removeClass('loading');
                    })
                }, function (err) {
                    console.log(err);
                }, function (progress) {
                    if (firstProgress) {
                        vm.userStocks = progress;
                        firstProgress = false;
                    } else {
                        _.forEach(progress, function (stock) {
                            if (stock.invTotal) {
                                $('#' + stock._id).removeClass('loading');
                            }
                        })
                    }
                });
        }

        function showAllCommentsForUser() {
            vm.userComments = [];
            CommentService.findCommentsByUserId(vm.userId)
                .then(
                    function (response) {
                        var comments = response.data,
                            userComments = [];
                        _.forEach(comments, function (comment) {
                            UserService.findById(comment.userId)
                                .then(function (response) {
                                    var user = response.data;
                                    _.extend(comment, {
                                        userFirstName: user.firstName,
                                        userLastName: user.lastName,
                                        userId: user._id,
                                        timestamp: moment(comment.timestamp).format('MM/DD/YYYY HH:mm:SS')
                                    });
                                    userComments.push(comment);
                                    if (userComments.length === comments.length) {
                                        vm.userComments = _.sortBy(userComments, 'timestamp');
                                    }
                                }, function (err) {
                                    console.log(err);
                                });
                        });
                    },
                    function (err) {
                        console.log(err);
                    }
                );
        }

        if ($rootScope.addToPortfolioCode) {
            vm.selectedStock = {
                code: $rootScope.addToPortfolioCode
            };
        }

        function addStock(stock) {
            if (stock.code && stock.invPrice && stock.quantity && stock.invDate) {
                PortfolioService.addStockToUserPortfolio($rootScope.user._id, stock)
                    .then(
                        function (response) {
                            if (response.status == 200) {
                                showAllStocksForUser();
                            }
                        }, function (err) {
                            console.log(err);
                        }
                    );
            }
        }

        function updateStock(stock) {
            PortfolioService.updatePortfolioStockInUser($rootScope.user._id, stock._id, stock)
                .then(
                    function (response) {
                        if (response.status == 200) {
                            showAllStocksForUser();
                        }
                    }, function (err) {
                        console.log(err);
                    }
                );
        }

        function deleteStock(stock) {
            PortfolioService.deletePortfolioStockByIdAndUserId($rootScope.user._id, stock._id)
                .then(
                    function (response) {
                        if (response.status == 200) {
                            showAllStocksForUser();
                        }
                    }, function (err) {
                        console.log(err);
                    }
                );
        }

        function selectStock(index) {
            vm.selectedStockIndex = index;
            vm.selectedStock = {
                _id: vm.userStocks[index]._id,
                userId: vm.userStocks[index].userId,
                code: vm.userStocks[index].code,
                invPrice: vm.userStocks[index].invPrice,
                quantity: vm.userStocks[index].quantity,
                invDate: new Date(vm.userStocks[index].invDate)
            }
        }

        function addComment(comment) {
            _.extend(comment, {
                userId: $rootScope.user._id,
                timestamp: Date.now
            });
            CommentService.addCommentToUserComments(vm.userId, comment)
                .then(function (response) {
                    $('#btn-input').val('');
                    showAllCommentsForUser();
                }, function (err) {
                    console.log(err);
                });
        }
    }
}());