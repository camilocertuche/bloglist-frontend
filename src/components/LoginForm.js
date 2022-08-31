import React, { useState, useCallback } from 'react';

const LoginForm = ({ handleLogin }) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onUserNameChange = useCallback(({ target }) => {
    setUserName(target.value);
  }, []);

  const onPasswordChange = useCallback(({ target }) => {
    setPassword(target.value);
  }, []);

  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      handleLogin(username, password);
    },
    [username, password, handleLogin]
  );

  return (
    <form onSubmit={onSubmit}>
      <div>
        username
        <input type='text' value={username} onChange={onUserNameChange} />
      </div>
      <div>
        password
        <input type='password' value={password} onChange={onPasswordChange} />
      </div>
      <div>
        <button type='submit'>login</button>
      </div>
    </form>
  );
};

export default LoginForm;
