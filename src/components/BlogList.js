import React from 'react';
import Blog from './Blog';

const BlogList = ({ blogs }) => {
  if (blogs.length === 0) {
    return null;
  }

  return (
    <div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogList;
