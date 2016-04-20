/**
 * @author dharam
 */
'use strict';
(function () {
    angular
        .module('PortManApp')
        .factory('RecommendationService', RecommendationService);

    function RecommendationService($http) {

        return {
            findRecommendationsByUserId: findRecommendationsByUserId,
            deleteRecommendationByIdAndUserId: deleteRecommendationByIdAndUserId,
            addRecommendationToUserRecommendations: addRecommendationToUserRecommendations,
            updateRecommendationInUser: updateRecommendationInUser
        };

        function findRecommendationsByUserId(userId) {
            return $http.get('/api/project/user/' + userId + '/recommendation');
        }

        function deleteRecommendationByIdAndUserId(userId, recommendationId) {
            return $http.delete('/api/project/user/' + userId + '/recommendation/' + recommendationId);
        }

        function addRecommendationToUserRecommendations(userId, recommendation) {
            return $http.post('/api/project/user/' + userId + '/recommendation', recommendation);
        }

        function updateRecommendationInUser(userId, recommendationId, recommendation) {
            return $http.put('/api/project/user/' + userId + '/portfolio/' + recommendationId, recommendation);
        }
    }
})();