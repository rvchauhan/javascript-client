import React from 'react';
import NavBar from '../NavBar/Navbar';

const PrivateLayout = (props) => {
  const { children } = props;
  return (
    <>
      <NavBar />
      <br />
      {children}
    </>
  );
};

export default PrivateLayout;
