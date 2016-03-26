/**
 * Created by dharam on 3/25/2016.
 */
'use strict';

module.exports = function(_, app, model, uuid) {

    app.post('/api/project/comment/:userId', createCommentForUser);
    app.get('/api/project/comment/:userId', findAllCommentsForUser);
    app.delete('/api/project/comment/:commentId', deleteCommentById);
    app.put('/api/project/comment/:commentId', updateCommentById);

    function createCommentForUser(req, res) {
        var userId = req.params.userId;
        var comment = req.body;
        comment._id = uuid.v4();
        var createdComment =  model.createCommentForUser(userId, comment);
        res.json(createdComment);
    }

    function findAllCommentsForUser(req, res) {
        var userId = req.params.userId;
        var commentsForUser = model.findAllCommentsForUser(userId);
        res.json(commentsForUser);
    }

    function deleteCommentById(req, res) {
        var commentId = req.params.commentId;
        var allComments = model.deleteCommentById(commentId);
        res.json(allComments);
    }

    function updateCommentById(req, res) {
        var commentId = req.params.commentId;
        var comment = req.body;
        var updatedComment = model.updateCommentById(commentId, comment);
        res.json(updatedComment);
    }

};