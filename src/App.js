import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) return;
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, [user]);

  const handleLogin = (username, password) => {
    loginService
      .login(username, password)
      .then((userLogged) => {
        setUser(userLogged);
        blogService.setToken(userLogged.token);
      })
      .catch((error) => console.log({ error }));
  };

  if (user === null) {
    return <LoginForm handleLogin={handleLogin} />;
  }
  return (
    <div>
      <h2>blogs</h2>
      <div style={{ margin: '10px 0px' }}>{`${user.name} logged in`}</div>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
