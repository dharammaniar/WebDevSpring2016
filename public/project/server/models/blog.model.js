/**
 * Created by dharam on 3/25/2016.
 */
'use strict';

module.exports = function(_) {

    var allBlogs = require('./blog.mock.json');

    function createBlogForUser(userId, blog) {
        _.extend(blog, {
            _id: (new Date).getTime(),
            userId: userId,
            dateCreated: (new Date)
        });
        allBlogs[allBlogs.length] = blog;

        return blog;
    }

    function findAllBlogsForUser(userId) {
        return _.filter(allBlogs, {
            userId: userId
        });
    }

    function deleteBlogById(blogId) {
        _.remove(allBlogs, function(blog) {
            return blog._id === blogId;
        });

        return allBlogs;
    }

    function updateBlogById(blogId, updatedBlog) {
        var blogToUpdate = _.find(allBlogs, {
            _id: blogId
        });

        _.extend(blogToUpdate, updatedBlog);

        return blogToUpdate;
    }

    return {
        createBlogForUser: createBlogForUser,
        findAllBlogsForUser: findAllBlogsForUser,
        deleteBlogById: deleteBlogById,
        updateBlogById: updateBlogById
    };
};