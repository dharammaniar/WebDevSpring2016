/**
 * Created by dharam on 3/25/2016.
 */
'use strict';

module.exports = function(_, app, model, uuid) {

    app.post('/api/projectOld/blog/:userId', createBlogForUser);
    app.get('/api/projectOld/blog/:userId', findAllBlogsForUser);
    app.delete('/api/projectOld/blog/:blogId', deleteBlogById);
    app.put('/api/projectOld/blog/:blogId', updateBlogById);

    function createBlogForUser(req, res) {
        var userId = req.params.userId;
        var blog = req.body;
        blog._id = uuid.v4();
        var createdBlog =  model.createBlogForUser(userId, blog);
        res.json(createdBlog);
    }

    function findAllBlogsForUser(req, res) {
        var userId = req.params.userId;
        var blogsForUser = model.findAllBlogsForUser(userId);
        res.json(blogsForUser);
    }

    function deleteBlogById(req, res) {
        var blogId = req.params.blogId;
        var allBlogs = model.deleteBlogById(blogId);
        res.json(allBlogs);
    }

    function updateBlogById(req, res) {
        var blogId = req.params.blogId;
        var blog = req.body;
        var updatedBlog = model.updateBlogById(blogId, blog);
        res.json(updatedBlog);
    }

};