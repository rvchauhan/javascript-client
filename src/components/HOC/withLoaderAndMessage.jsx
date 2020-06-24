import React from 'react';


const hoc = (WrappedComponent) => (props) => {
  const { loader, count, ...rest } = props;
  return (<WrappedComponent loader={loader} count={count} {...rest} />);
};

export default hoc;
