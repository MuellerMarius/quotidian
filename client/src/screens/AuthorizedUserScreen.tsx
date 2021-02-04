import React, { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import UserProfileScreen from './UserProfileScreen';
import StatisticsScreen from './StatisticsScreen';
import ActivityScreen from './ActivityScreen';
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
            <Route path="/profile" component={UserProfileScreen} />
            <Route path="/statistics" component={StatisticsScreen} />
            <Route path="/activities" component={ActivityScreen} />
          </Switch>
        </Grid>
      </main>
      <GlobalSnackbar />
    </Grid>
  );
}

export default AuthorizedUserScreen;
