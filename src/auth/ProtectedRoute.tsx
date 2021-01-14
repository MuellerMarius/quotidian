import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import { CircularProgress } from '@material-ui/core';

const ProtectedRoute: React.FC<RouteProps> = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component!, {
      onRedirecting: () => <CircularProgress />,
    })}
    {...args}
  />
);

export default ProtectedRoute;
