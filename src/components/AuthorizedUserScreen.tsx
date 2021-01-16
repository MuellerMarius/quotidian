import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Grid, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { NavLink, Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';
import Entries from './Entries';
import UserProfile from './UserProfile';
import Statistics from './Statistics';
import NavBar from './NavBar';

function AuthorizedUserScreen() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Entries} />
        <Route path="/pro" component={UserProfile} />
        <ProtectedRoute path="/profile" component={UserProfile} />
        <ProtectedRoute path="/entries" component={Entries} />
        <ProtectedRoute path="/statistics" component={Statistics} />
      </Switch>
    </>
  );
}

export default AuthorizedUserScreen;
