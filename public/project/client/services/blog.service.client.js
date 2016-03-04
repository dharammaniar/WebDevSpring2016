'use strict';

(function() {
    angular
        .module('FormBuilderApp')
        .factory('BlogService', BlogService);

    function BlogService() {
        var allBlogs = [
            {
                "_id": "1",
                "userId": 123,
                "title": "Example Blog 1",
                "description": "Blog Description",
                "dateCreated": "2016-03-02T07:35:09.988Z"
            },
            {
                "_id": "2",
                "userId": 123,
                "title": "Example Blog 2",
                "description": "Blog Description",
                "dateCreated": "2016-03-04T07:35:09.988Z"
            },
            {
                "_id": "3",
                "userId": 234,
                "title": "Example Blog 1",
                "description": "Blog Description",
                "dateCreated": "2016-03-01T07:35:09.988Z"
            }
        ];

        function createBlogForUser(userId, blog, callback) {
            _.extend(blog, {
                _id: (new Date).getTime(),
                userId: userId,
                dateCreated: (new Date)
            });
            allBlogs[allBlogs.length] = blog;

            callback(blog);
        }

        function findAllBlogsForUser(userId, callback) {
            var blogsFound = _.filter(allBlogs, {
                userId: userId
            });

            callback(blogsFound);
        }

        function deleteBlogById(blogId, callback) {
            _.remove(allBlogs, function(blog) {
                return blog._id === blogId;
            });

            callback(allBlogs);
        }

        function updateBlogById(blogId, updatedBlog, callback) {
            var blogToUpdate = _.find(allBlogs, {
                _id: blogId
            });

            _.extend(blogToUpdate, updatedBlog);

            callback(blogToUpdate);
        }

        return {
            createBlogForUser: createBlogForUser,
            findAllBlogsForUser: findAllBlogsForUser,
            deleteBlogById: deleteBlogById,
            updateBlogById: updateBlogById
        };
    }
}());