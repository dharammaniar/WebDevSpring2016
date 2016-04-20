/**
 * @author dharam
 */
'use strict';

module.exports = function(app, model) {
  
    app.get('/api/project/user/:userId/recommendation', findRecommendationsByUserId);
    app.delete('/api/project/user/:userId/recommendation/:recommendationId', deleteRecommendationByIdAndUserId);
    app.post('/api/project/user/:userId/recommendation', addRecommendationToUserRecommendations);
    app.put('/api/project/user/:userId/portfolio/:recommendationId', updateRecommendationInUser);

    function findRecommendationsByUserId(req, res) {
        model.findRecommendationsByUserId(req.params.userId)
            .then(
                function(recommendations) {
                    res.json(recommendations);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteRecommendationByIdAndUserId(req, res) {
        model.deleteRecommendationByIdAndUserId(req.params.userId, req.params.recommendationId)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function addRecommendationToUserRecommendations(req, res) {
        var recommendations = req.body;
        model.addRecommendationToUserRecommendations(req.params.userId, recommendations)
            .then(
                function(user) {
                    res.json(user);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateRecommendationInUser(req, res) {
        var recommendation = req.body;
        model.updateRecommendationInUser(req.params.userId, req.params.recommendationId, recommendation)
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