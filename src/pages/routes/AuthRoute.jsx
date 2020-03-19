import React from 'react';
import { Route } from 'react-router-dom';
import AuthLayout from '../../components/layouts/AuthLayout/index';

const LoginLayoutRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => (
      <AuthLayout>
        <Component {...matchProps} />
      </AuthLayout>
    )}
  />
);

export default LoginLayoutRoute;
