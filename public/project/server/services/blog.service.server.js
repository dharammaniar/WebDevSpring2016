/**
 * @author dharam
 */
'use strict';

module.exports = function(app, model) {

    app.get('/api/project/blog/:blogId', findBlogById);
    app.get('/api/project/blog', findAllBlogs);
    app.get('/api/project/user/:userId/blog', findAllBlogsForUser);
    app.delete('/api/project/blog/:blogId', deleteBlogById);
    app.post('/api/project/blog', createBlog);
    app.put('/api/project/blog/:blogId', updateBlog);

    function findBlogById(req, res) {
        model.findById(req.params.blogId)
            .then(
                function(blog) {
                    res.json(blog);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function findAllBlogs(req, res) {
        model.findAll()
            .then(
                function(blogs) {
                    res.json(blogs);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteBlogById(req, res) {
        model.deleteBlog(req.params.blogId)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function createBlog(req, res) {
        var blog = req.body;
        model.create(blog)
            .then(
                function(blog) {
                    res.json(blog);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }

    function updateBlog(req, res) {
        var blog = req.body;
        model.update(req.params.blogId, blog)
            .then(
                function(stats) {
                    res.send(200);
                },
                function(err) {
                    res.status(400).send(err);
                }
            )
    }

    function findAllBlogsForUser(req, res) {
        model.findAllBlogsForUser(req.params.userId)
            .then(
                function(blogs) {
                    res.json(blogs);
                },
                function(err) {
                    res.status(400).send(err);
                }
            );
    }
};