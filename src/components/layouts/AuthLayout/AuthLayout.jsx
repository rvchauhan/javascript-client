import React from 'react';
import Footer from '../../Footer/index';

const AuthLayout = (props) => {
  const { children } = props;
  return (
    <div>
      <p>Heelo</p>
      {children}
      <Footer />
    </div>
  );
};

export default AuthLayout;
