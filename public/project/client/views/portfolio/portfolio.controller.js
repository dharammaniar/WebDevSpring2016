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
            PortfolioService.findPortfolioByUserId($rootScope.user._id)
                .then(function(portfolio){
                    vm.userStocks = [];
                    _.forEach(portfolio.data, function(stock) {
                        var portfolioStock = {
                            code: stock.code,
                            invPrice: stock.invPrice,
                            quantity: stock.quantity,
                            invDate: moment(stock.invDate).format('MM/DD/YYYY'),
                            invTotal: Number(stock.invPrice) * Number(stock.quantity)
                        };
                        $http({
                            method: 'GET',
                            url: 'https://www.quandl.com/api/v3/datasets/WIKI/' + stock.code + '.json?auth_token=bbt3K2NScvyFC4f-trat'
                        }).then(function successCallback(response) {
                            portfolioStock.stockIndex = response.data.dataset.data[0][4];
                            portfolioStock.currentTotal = Number(response.data.dataset.data[0][4]) * Number(stock.quantity);
                            if (portfolioStock.invTotal <= portfolioStock.currentTotal) {
                                portfolioStock.profit = portfolioStock.currentTotal - portfolioStock.invTotal;
                                portfolioStock.profitPercentage = numeral(portfolioStock.profit/portfolioStock.invTotal).format('0.00%');
                                portfolioStock.profit = numeral(portfolioStock.profit).format('$0,0.00');
                            } else {
                                portfolioStock.loss = portfolioStock.invTotal - portfolioStock.currentTotal;
                                portfolioStock.lossPercentage = numeral(portfolioStock.loss/portfolioStock.invTotal).format('0.00%');
                                portfolioStock.loss = numeral(portfolioStock.loss).format('$0,0.00');
                            }

                            portfolioStock.invTotal = numeral(portfolioStock.invTotal).format('$0,0.00');
                            portfolioStock.currentTotal = numeral(portfolioStock.currentTotal).format('$0,0.00');

                            vm.userStocks.push(portfolioStock);

                        }, function errorCallback(response) {
                            console.log(response);
                        });
                    });
                    delete vm.selectedStock;
                    delete vm.selectedStockIndex;
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