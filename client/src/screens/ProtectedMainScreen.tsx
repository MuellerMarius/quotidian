import React, { useEffect } from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { Route, Switch } from 'react-router-dom';
import UserProfileScreen from './UserProfileScreen';
import StatisticsScreen from './StatisticsScreen';
import ActivityScreen from './ActivityScreen';
import NavBar from '../components/NavBar';
import useApi from '../hooks/useApi';
import EntryScreen from './EntryScreen';
import CenteredCircularProgress from '../components/CenteredCircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto 0 auto',
    [theme.breakpoints.up('md')]: {
      width: '93%',
    },
  },
}));

const ProtectedMainScreen = () => {
  const { isLoading, isAuthenticated } = useAuth0();
  const { status, getCommonUserData } = useApi();
  const classes = useStyles();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      getCommonUserData();
    }
  }, [getCommonUserData, isAuthenticated, isLoading]);

  return (
    <Grid container direction="column" classes={{ root: classes.root }}>
      <Grid item>
        <NavBar />
      </Grid>
      <Grid item>
        <main>
          <Switch>
            <Route exact path="/">
              <EntryScreen status={status} />
            </Route>
            <Route path="/profile">
              <UserProfileScreen />
            </Route>
            <Route path="/statistics">
              <StatisticsScreen />
            </Route>
            <Route path="/activities">
              <ActivityScreen status={status} />
            </Route>
          </Switch>
        </main>
      </Grid>
    </Grid>
  );
};

export default withAuthenticationRequired(ProtectedMainScreen, {
  onRedirecting: () => <CenteredCircularProgress />,
});
