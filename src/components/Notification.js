import React from 'react';

const Notification = ({ notification }) => {
  if (!notification) {
    return null;
  }

  const { type, text } = notification;
  const color = type === 'error' ? 'red' : 'green';

  const style = {
    color,
    borderColor: color,
    border: 'solid',
    backgroundColor: 'lightgray',
    padding: '10px 5px',
    margin: '5px 0px',
    fontWeight: 'bolder',
    borderRadius: 4,
  };

  return <div style={style}>{text}</div>;
};

export default Notification;
