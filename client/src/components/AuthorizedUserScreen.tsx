import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import ProtectedRoute from '../auth/ProtectedRoute';
import Entries from './Entries';
import UserProfile from './UserProfile';
import Statistics from './Statistics';
import NavBar from './NavBar';
import { useGlobalContext } from '../context/GlobalContext';
import { ActionNames } from '../types/types';

function AuthorizedUserScreen() {
  const { getAccessTokenSilently } = useAuth0();
  const { dispatch } = useGlobalContext();

  useEffect(() => {
    getAccessTokenSilently().then((jwt) =>
      dispatch!({ type: ActionNames.SET_JWT, payload: { jwt } })
    );
  }, [getAccessTokenSilently, dispatch]);

  return (
    <Grid
      container
      direction="column"
      xs={12}
      md={11}
      xl={10}
      style={{ margin: '0 auto 0 auto' }}
    >
      <Grid item>
        <NavBar />
      </Grid>
      <Grid item>
        <Switch>
          <Route exact path="/" component={Entries} />
          <Route path="/pro" component={UserProfile} />
          <ProtectedRoute path="/profile" component={UserProfile} />
          <ProtectedRoute path="/entries" component={Entries} />
          <ProtectedRoute path="/statistics" component={Statistics} />
        </Switch>
      </Grid>
    </Grid>
  );
}

export default AuthorizedUserScreen;
