/**
 * @author dharam
 */
(function() {
    angular
        .module('PortManApp')
        .factory('PortfolioService', PortfolioService);

    function PortfolioService($http, $q) {

        function findPortfolioByUserId(userId) {
            return $http.get('/api/project/user/' + userId + '/portfolio');
        }

        function findPortfolioStockByStockIdAndUserId(userId, stockId) {
            return $http.get('/api/project/user/'+userId+'/portfolio/'+stockId);
        }

        function deletePortfolioStockByIdAndUserId(userId, stockId) {
            return $http.delete('/api/project/user/'+userId+'/portfolio/'+stockId);
        }

        function addStockToUserPortfolio(userId, stock) {
            return $http.post('/api/project/user/' + userId + '/portfolio', stock);
        }

        function updatePortfolioStockInUser(userId, stockId, stock) {
            return $http.put('/api/project/user/'+userId+'/portfolio/'+stockId, stock);
        }

        function getPortfolio(userId) {
            var deferred = $q.defer();
            findPortfolioByUserId(userId)
                .then(function(portfolio){
                    var userStocks = [];
                    _.forEach(portfolio.data, function(stock) {
                        var portfolioStock = {
                            _id: stock._id,
                            code: stock.code,
                            invPrice: stock.invPrice,
                            quantity: stock.quantity,
                            invDate: moment(stock.invDate).format('MM/DD/YYYY'),
                            invTotalNumber: Number(stock.invPrice) * Number(stock.quantity),
                            stockIndex: 0.0
                        };
                        userStocks.push(portfolioStock);
                        $http({
                            method: 'GET',
                            url: 'https://www.quandl.com/api/v3/datasets/WIKI/' + stock.code + '.json?auth_token=bbt3K2NScvyFC4f-trat'
                        }).then(function successCallback(response) {
                            portfolioStock.stockIndex = response.data.dataset.data[0][4];
                            portfolioStock.currentTotalNumber = Number(response.data.dataset.data[0][4]) * Number(stock.quantity);
                            if (portfolioStock.invTotalNumber <= portfolioStock.currentTotalNumber) {
                                portfolioStock.profitNumber = portfolioStock.currentTotalNumber - portfolioStock.invTotalNumber;
                                portfolioStock.profitPercentage = numeral(portfolioStock.profitNumber/portfolioStock.invTotalNumber).format('0.00%');
                                portfolioStock.profit = numeral(portfolioStock.profitNumber).format('$0,0.00');
                            } else {
                                portfolioStock.lossNumber = portfolioStock.invTotalNumber - portfolioStock.currentTotalNumber;
                                portfolioStock.lossPercentage = numeral(portfolioStock.lossNumber/portfolioStock.invTotalNumber).format('0.00%');
                                portfolioStock.loss = numeral(portfolioStock.lossNumber).format('$0,0.00');
                            }

                            portfolioStock.invTotal = numeral(portfolioStock.invTotalNumber).format('$0,0.00');
                            portfolioStock.currentTotal = numeral(portfolioStock.currentTotalNumber).format('$0,0.00');

                            userStocks.push(portfolioStock);

                            if (userStocks.length == portfolio.data.length) {
                                deferred.resolve(userStocks);
                            } else {
                                deferred.notify(userStocks);
                            }

                        }, function errorCallback(response) {
                            console.log(response);
                            deferred.reject(response);
                        });
                    });
                    deferred.notify(userStocks);
                    userStocks = [];
                });

            return deferred.promise;
        }

        return {
            findPortfolioByUserId: findPortfolioByUserId,
            findPortfolioStockByStockIdAndUserId: findPortfolioStockByStockIdAndUserId,
            deletePortfolioStockByIdAndUserId: deletePortfolioStockByIdAndUserId,
            addStockToUserPortfolio: addStockToUserPortfolio,
            updatePortfolioStockInUser: updatePortfolioStockInUser,
            getPortfolio: getPortfolio
        };
    }
})();