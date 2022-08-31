import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs, handleEditBlog }) => {
  if (blogs.length === 0) {
    return null;
  }

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} handleEditBlog={handleEditBlog} />
      ))}
    </div>
  );
};

export default BlogList;
