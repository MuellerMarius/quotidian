import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { Route, Routes } from 'react-router-dom';
import UserProfileScreen from './UserProfileScreen';
import StatisticsScreen from './StatisticsScreen';
import ActivityScreen from './ActivityScreen';
import NavBar from '../components/NavBar';
import useApi from '../hooks/useApi';
import EntryScreen from './EntryScreen';
import { useAuth } from '../context/AuthContext';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '0 auto 0 auto',
    [theme.breakpoints.up('md')]: {
      width: '93%',
    },
  },
}));

const ProtectedMainScreen = () => {
  const { status, getCommonUserData } = useApi();
  const { isAuthenticated } = useAuth();
  const classes = useStyles();

  useEffect(() => {
    if (isAuthenticated) {
      getCommonUserData();
    }
  }, [getCommonUserData, isAuthenticated]);

  return (
    <Grid container direction="column" classes={{ root: classes.root }}>
      <Grid item>
        <NavBar />
      </Grid>
      <Grid item>
        <main>
          <Routes>
            <Route path="/" element={<EntryScreen status={status} />} />
            <Route path="/profile" element={<UserProfileScreen />} />
            <Route path="/statistics" element={<StatisticsScreen />} />
            <Route
              path="/activities"
              element={<ActivityScreen status={status} />}
            />
          </Routes>
        </main>
      </Grid>
    </Grid>
  );
};

export default ProtectedMainScreen;
