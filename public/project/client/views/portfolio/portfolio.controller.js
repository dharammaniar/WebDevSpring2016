/**
 * @author dharam
 */
'use strict';

(function (){
    angular
        .module('PortManApp')
        .controller('PortfolioController', PortfolioController);

    function PortfolioController($http, $rootScope, PortfolioService) {

        var vm = this;

        vm.userStocks = [];
        showAllStocksForUser();

        function showAllStocksForUser() {
            PortfolioService.getPortfolio($rootScope.user._id)
                .then(function(portfolio) {
                    vm.userStocks = portfolio;
                    delete vm.selectedStock;
                    delete vm.selectedStockIndex;
                }, function(err) {
                    console.log(err);
                }, function(progress) {
                    vm.userStocks = progress;
                });
        }

        // Event Handler Declaration
        vm.addStock = addStock;
        vm.updateStock = updateStock;
        vm.deleteStock = deleteStock;
        vm.selectStock = selectStock;

        //Event Handler Implementation
        function addStock(stock) {
            if (stock.code && stock.invPrice && stock.quantity && stock.invDate) {
                PortfolioService.addStockToUserPortfolio($rootScope.user._id, stock)
                    .then(
                        function(response){
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
                    function(response){
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
                    function(response) {
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
    }
}());