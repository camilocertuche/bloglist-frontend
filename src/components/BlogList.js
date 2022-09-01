import React from 'react';
import PropTypes from 'prop-types';
import Blog from './Blog';

const BlogList = ({
  blogs,
  handleEditBlog,
  handleDeleteBlog,
  loggedUserName,
}) => {
  if (blogs.length === 0) {
    return null;
  }

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleEditBlog={handleEditBlog}
          handleDeleteBlog={handleDeleteBlog}
          loggedUserName={loggedUserName}
        />
      ))}
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  handleEditBlog: PropTypes.func.isRequired,
  handleDeleteBlog: PropTypes.func.isRequired,
  loggedUserName: PropTypes.string.isRequired,
};

export default BlogList;
