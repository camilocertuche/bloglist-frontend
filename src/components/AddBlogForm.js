import React, { useState } from 'react';

const INITIAL_BLOG = { title: '', author: '', url: '' };

const AddBlogForm = ({ handleAddBlog }) => {
  const [blog, setBlog] = useState(INITIAL_BLOG);

  const handleChange = (key, value) => {
    setBlog((prevBlog) => {
      const newBlog = { ...prevBlog };
      newBlog[key] = value;
      return newBlog;
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddBlog(blog);
    setBlog(INITIAL_BLOG);
  };

  return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleSubmit}>
        <div>
          title:
          <input
            type='text'
            value={blog.title}
            onChange={({ target }) => handleChange('title', target.value)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={blog.author}
            onChange={({ target }) => handleChange('author', target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={blog.url}
            onChange={({ target }) => handleChange('url', target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AddBlogForm;
