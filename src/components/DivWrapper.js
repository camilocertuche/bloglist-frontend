import React from 'react';

const DivWrapper = (props) => {
  const style = {
    border: '1px solid',
    borderRadious: 4,
    paddingTop: 10,
    paddingLeft: 2,
    marginBottom: 5,
  };

  return <div style={style}>{props.children}</div>;
};

export default DivWrapper;
