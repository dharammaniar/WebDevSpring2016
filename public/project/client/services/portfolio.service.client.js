/**
 * @author dharam
 */
(function() {
    angular
        .module('PortManApp')
        .factory('PortfolioService', PortfolioService);

    function PortfolioService($http) {

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

        return {
            findPortfolioByUserId: findPortfolioByUserId,
            findPortfolioStockByStockIdAndUserId: findPortfolioStockByStockIdAndUserId,
            deletePortfolioStockByIdAndUserId: deletePortfolioStockByIdAndUserId,
            addStockToUserPortfolio: addStockToUserPortfolio,
            updatePortfolioStockInUser: updatePortfolioStockInUser
        };
    }
})();