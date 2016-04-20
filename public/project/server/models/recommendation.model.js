/**
 * @author dharam
 */
var _ = require('lodash');

module.exports = function(projectUserModel) {

    var ProjectUser = projectUserModel.getMongooseModel();

    function findRecommendationsByUserId(userId) {
        return ProjectUser
            .findById(userId)
            .then(
                function(user) {
                    return user.recommendations;
                }
            );
    }

    function deleteRecommendationByIdAndUserId(userId, recommendationId) {
        return ProjectUser
            .findById(userId)
            .then(
                function(user) {
                    user.recommendations.id(recommendationId).remove();
                    return user.save();
                }
            )
    }

    function addRecommendationToUserRecommendations(userId, recommendation) {
        return ProjectUser
            .findById(userId)
            .then(
                function(user) {
                    user.recommendations.push(recommendation);
                    return user.save();
                }
            );
    }

    function updateRecommendationInUser(userId, recommendationId, recommendation) {
        return ProjectUser
            .findById(userId)
            .then(
                function(user) {
                    var recommendationToUpdate = user.recommendations.id(recommendationId);
                    _.extend(recommendationToUpdate, recommendation);
                    return user.save();
                }
            )
    }

    return {
        findRecommendationsByUserId: findRecommendationsByUserId,
        deleteRecommendationByIdAndUserId: deleteRecommendationByIdAndUserId,
        addRecommendationToUserRecommendations: addRecommendationToUserRecommendations,
        updateRecommendationInUser: updateRecommendationInUser
    }
};
