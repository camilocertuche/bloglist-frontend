import React, { useState } from 'react';

import DivWrapper from './DivWrapper';

const Blog = ({ blog, handleEditBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const buttonText = detailsVisible ? 'hide' : 'view';

  const toggleDatailsVisibility = () => {
    setDetailsVisible((prevState) => !prevState);
  };

  const handleLike = () => {
    const { id, author, title, user, likes, url } = blog;

    const editedBlog = {
      user: user?.id,
      likes: likes + 1,
      author,
      title,
      url,
    };

    handleEditBlog(id, editedBlog);
  };

  return (
    <DivWrapper>
      <div>
        {`${blog.title} `}
        <button onClick={toggleDatailsVisibility}>{buttonText}</button>
      </div>

      {detailsVisible && (
        <div>
          <div>{blog.url}</div>
          <div>
            {`likes ${blog.likes}`} <button onClick={handleLike}>like</button>
          </div>
          <div>{blog.author}</div>
        </div>
      )}
    </DivWrapper>
  );
};

export default Blog;
