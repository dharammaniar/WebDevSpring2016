/**
 * @author dharam
 */
(function() {
    angular
        .module('PortManApp')
        .factory('MessageService', MessageService);

    function MessageService($http) {

        function findMessagesByStockCode(stockCode) {
            return $http.get('/api/project/stock/' + stockCode + '/messages');
        }

        function findMessageByIdAndStockCode(stockCode, messageId) {
            return $http.get('/api/project/stock/'+stockCode+'/messages/'+messageId);
        }

        function deleteMessageByIdAndStockCode(stockCode, messageId) {
            return $http.delete('/api/project/stock/'+stockCode+'/messages/'+messageId);
        }

        function addMessageToStockMessages(stockCode, message) {
            return $http.post('/api/project/stock/' + stockCode + '/messages', message);
        }

        function updateMessageInStockMessages(stockCode, messageId, message) {
            return $http.put('/api/project/stock/'+stockCode+'/messages/'+messageId, message);
        }

        return {
            findMessagesByStockCode: findMessagesByStockCode,
            findMessageByIdAndStockCode: findMessageByIdAndStockCode,
            deleteMessageByIdAndStockCode: deleteMessageByIdAndStockCode,
            addMessageToStockMessages: addMessageToStockMessages,
            updateMessageInStockMessages: updateMessageInStockMessages
        };
    }
})();