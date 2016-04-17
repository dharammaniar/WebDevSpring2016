/**
 * @author dharam
 */
var _ = require('lodash');

module.exports = function(projectUserModel) {

    var ProjectUser = projectUserModel.getMongooseModel();

    function findCommentsByUserId(userId) {
        return ProjectUser
            .findById(userId)
            .then(
                function(user) {
                    return user.portfolioComments;
                }
            );
    }

    function findCommentByIdAndUserId(userId, commentId) {
        return ProjectUser
            .findById(userId)
            .then(
                function(user) {
                    return user.portfolioComments.id(commentId);
                }
            )
    }

    function deleteCommentByIdAndUserId(userId, commentId) {
        return ProjectUser
            .findById(userId)
            .then(
                function(user) {
                    user.portfolioComments.id(commentId).remove();
                    return user.save();
                }
            )
    }

    function addCommentToUserComments(userId, comment) {
        return ProjectUser
            .findById(userId)
            .then(
                function(user) {
                    user.portfolioComments.push(comment);
                    return user.save();
                }
            );
    }

    function updateCommentInUserComments(userId, commentId, comment) {
        return ProjectUser
            .findById(userId)
            .then(
                function(user) {
                    var commentToUpdate = user.portfolioComments.id(commentId);
                    _.extend(commentToUpdate, comment);
                    return user.save();
                }
            )
    }

    return {
        findCommentsByUserId: findCommentsByUserId,
        findCommentByIdAndUserId: findCommentByIdAndUserId,
        deleteCommentByIdAndUserId: deleteCommentByIdAndUserId,
        addCommentToUserComments: addCommentToUserComments,
        updateCommentInUserComments: updateCommentInUserComments
    }
};
