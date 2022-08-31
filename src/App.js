import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import AddBlogForm from './components/AddBlogForm';
import blogService from './services/blogs';
import loginService from './services/login';

const LOGGED_USER = 'loggedNoteAppUser';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) return;
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(LOGGED_USER);

    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const handleAddBlog = (blog) => {
    blogService.add(blog).then((addedBlog) => {
      setBlogs((prevBlogs) => {
        return [...prevBlogs, addedBlog];
      });
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
      .catch((error) => console.log({ error }));
  };

  const handleLogout = () => {
    window.localStorage.removeItem(LOGGED_USER);
    setUser(null);
    blogService.setToken('');
  };

  if (user === null) {
    return <LoginForm handleLogin={handleLogin} />;
  }
  return (
    <div>
      <h1>blogs</h1>
      <div style={{ margin: '10px 0px' }}>
        {`${user.name} logged in`}
        <button onClick={handleLogout}>logout</button>
      </div>
      <AddBlogForm handleAddBlog={handleAddBlog} />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
