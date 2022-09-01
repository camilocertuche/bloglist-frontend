import { useState, useEffect, useCallback, useRef } from 'react';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import AddBlogForm from './components/AddBlogForm';
import Notification from './components/Notification';
import LoginInfo from './components/LoginInfo';
import Title from './components/Title';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const LOGGED_USER = 'loggedNoteAppUser';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const blogFormRef = useRef();

  const showNotification = (text, type) => {
    setNotification({ text, type });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const showError = useCallback((text) => {
    showNotification(text, 'error');
  }, []);

  const showSuccess = useCallback((text) => {
    showNotification(text, 'success');
  }, []);

  const compareBlogs = (firstBlog, secondBlog) => {
    return secondBlog.likes - firstBlog.likes;
  };

  useEffect(() => {
    if (!user) return;

    blogService
      .getAll()
      .then((blogs) => {
        blogs.sort(compareBlogs);
        setBlogs(blogs);
      })
      .catch(({ response }) => {
        showError(`error getting blogs: ${response.data.error}`);
      });
  }, [user, showError]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(LOGGED_USER);

    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const handleAddBlog = (blog) => {
    blogService
      .add(blog)
      .then((addedBlog) => {
        const { title, author } = addedBlog;
        showSuccess(`a new blog ${title} by ${author} added`);
        blogFormRef.current.toggleVisibility();
        setBlogs((prevBlogs) => {
          return [...prevBlogs, addedBlog];
        });
      })
      .catch(({ response }) => {
        showError(`error adding: ${response.data.error}`);
      });
  };

  const handleEditBlog = (id, blog) => {
    blogService
      .edit(id, blog)
      .then((editedBlog) => {
        const { title } = editedBlog;
        showSuccess(`the blog ${title} was successfuly edited`);
        setBlogs((prevBlogs) => {
          const newBlogs = prevBlogs.map((blog) =>
            blog.id !== id ? blog : editedBlog
          );

          newBlogs.sort(compareBlogs);

          return newBlogs;
        });
      })
      .catch(({ response }) => {
        showError(`error editing: ${response.data.error}`);
      });
  };

  const handleDeleteBlog = (id) => {
    blogService
      .remove(id)
      .then(() => {
        showSuccess(`the blog was deleted`);
        setBlogs((prevBlogs) => {
          return prevBlogs.filter((blog) => blog.id !== id);
        });
      })
      .catch(({ response }) => {
        showError(`error deleting: ${response.data.error}`);
      });
  };

  const handleLogin = (username, password) => {
    loginService
      .login(username, password)
      .then((userLogged) => {
        setUser(userLogged);
        blogService.setToken(userLogged.token);

        window.localStorage.setItem(LOGGED_USER, JSON.stringify(userLogged));
      })
      .catch(({ response }) =>
        showError(`error login: ${response.data.error}`)
      );
  };

  const handleLogout = () => {
    window.localStorage.removeItem(LOGGED_USER);
    setUser(null);
    blogService.setToken('');
  };

  if (user === null) {
    return (
      <div>
        <Title text='log in to application' />
        <Notification notification={notification} />
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  }
  return (
    <div>
      <Title text='blogs' />
      <Notification notification={notification} />
      <LoginInfo user={user} handleLogout={handleLogout} />
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <AddBlogForm handleAddBlog={handleAddBlog} />
      </Togglable>
      <BlogList
        blogs={blogs}
        handleEditBlog={handleEditBlog}
        handleDeleteBlog={handleDeleteBlog}
        loggedUserName={user.username}
      />
    </div>
  );
};

export default App;
