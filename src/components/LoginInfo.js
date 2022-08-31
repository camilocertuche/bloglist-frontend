import React from 'react';

const LoginInfo = ({ user, handleLogout }) => {
  if (!user) {
    return null;
  }

  return (
    <div style={{ margin: '10px 0px' }}>
      {`${user.name} logged in`}
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default LoginInfo;
