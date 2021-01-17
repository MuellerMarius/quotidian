import React from 'react';
import { Grid } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';
import Entries from './Entries';
import UserProfile from './UserProfile';
import Statistics from './Statistics';
import NavBar from './NavBar';

function AuthorizedUserScreen() {
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
