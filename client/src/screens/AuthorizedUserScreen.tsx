import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';
import UserProfile from '../components/UserProfile';
import Statistics from '../components/Statistics';
import NavBar from '../components/NavBar';
import useApi from '../hooks/useApi';
import EntryScreen from './EntryScreen';
import GlobalSnackbar from '../components/GlobalSnackbar';

function AuthorizedUserScreen() {
  const { status, getEntries } = useApi();

  useEffect(() => {
    getEntries();
  }, [getEntries]);

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
      <main>
        <Grid item>
          <Switch>
            <Route exact path="/">
              <EntryScreen status={status} />
            </Route>
            <Route path="/pro" component={UserProfile} />
            <ProtectedRoute path="/profile" component={UserProfile} />
            <ProtectedRoute path="/entries" component={EntryScreen} />
            <ProtectedRoute path="/statistics" component={Statistics} />
          </Switch>
        </Grid>
      </main>
      <GlobalSnackbar />
    </Grid>
  );
}

export default AuthorizedUserScreen;
