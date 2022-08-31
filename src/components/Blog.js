import React, { useState } from 'react';
import DivWrapper from './DivWrapper';

const Blog = ({ blog, handleEditBlog, handleDeleteBlog, loggedUserName }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const { id, author, title, user, likes, url } = blog;

  const buttonText = detailsVisible ? 'hide' : 'view';
  const showRemoveButton = user?.username === loggedUserName;

  const toggleDatailsVisibility = () => {
    setDetailsVisible((prevState) => !prevState);
  };

  const handleLike = () => {
    const editedBlog = {
      user: user?.id,
      likes: likes + 1,
      author,
      title,
      url,
    };

    handleEditBlog(id, editedBlog);
  };

  const handleRemove = () => {
    if (window.confirm(`Remove ${title} by ${author}`)) {
      handleDeleteBlog(id);
    }
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
          {showRemoveButton && <button onClick={handleRemove}>remove</button>}
        </div>
      )}
    </DivWrapper>
  );
};

export default Blog;
