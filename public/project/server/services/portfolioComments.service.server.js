/**
 * @author dharam
 */
'use strict';

module.exports = function(app, model) {

    app.get('/api/project/user/:userId/comments', findCommentsByUserId);
    app.get('/api/project/user/:userId/comments/:commentId', findCommentByIdAndUserId);
    app.delete('/api/project/user/:userId/comments/:commentId', deleteCommentByIdAndUserId);
    app.post('/api/project/user/:userId/comments', addCommentToUserComments);
    app.put('/api/project/user/:userId/comments/:commentId', updateCommentInUserComments);

    function findCommentsByUserId(req, res) {
        model.findCommentsByUserId(req.params.userId)
            .then(
                function(comments) {
                    res.json(comments);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findCommentByIdAndUserId(req, res) {
        model.findCommentByIdAndUserId(req.params.userId, req.params.commentId)
            .then(
                function(comment) {
                    res.json(comment);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteCommentByIdAndUserId(req, res) {
        model.deleteCommentByIdAndUserId(req.params.userId, req.params.commentId)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function addCommentToUserComments(req, res) {
        var comment = req.body;
        model.addCommentToUserComments(req.params.userId, comment)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateCommentInUserComments(req, res) {
        var comment = req.body;
        model.updateCommentInUserComments(req.params.userId, req.params.commentId, comment)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }
};