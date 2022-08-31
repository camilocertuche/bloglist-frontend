import React, { useState } from 'react';

import DivWrapper from './DivWrapper';

const Blog = ({ blog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);
  const buttonText = detailsVisible ? 'hide' : 'view';

  const toggleDatailsVisibility = () => {
    setDetailsVisible((prevState) => !prevState);
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
            {`likes ${blog.likes}`} <button>like</button>
          </div>
          <div>{blog.author}</div>
        </div>
      )}
    </DivWrapper>
  );
};

export default Blog;
