import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { withAuthenticationRequired } from '@auth0/auth0-react';
import CenteredCircularProgress from '../components/CenteredCircularProgress';

const ProtectedRoute: React.FC<RouteProps> = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component!, {
      onRedirecting: () => <CenteredCircularProgress />,
    })}
    {...args}
  />
);

export default ProtectedRoute;
