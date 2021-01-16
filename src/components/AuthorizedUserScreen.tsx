import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Link, Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';
import Entries from './Entries';
import UserProfile from './UserProfile';
import Statistics from './Statistics';
import ProfileAvatar from './ProfileAvatar';
import LanguageSelector from './LanguageSelector';

function AuthorizedUserScreen() {
  const { t } = useTranslation();
  const { logout } = useAuth0();

  return (
    <>
      <div>
        Das ist top <Link to="/pro">Open Entries</Link> |{' '}
        <Link to="/">home</Link> | <Link to="/profile">Private Profile</Link>
        <LanguageSelector />
        <ProfileAvatar />
      </div>

      <div>
        s
        <Button color="primary" onClick={() => logout()}>
          Logout
        </Button>
        <Switch>
          <Route exact path="/" component={Entries} />
          <Route path="/pro" component={UserProfile} />
          <ProtectedRoute path="/profile" component={UserProfile} />
          <ProtectedRoute path="/entries" component={Entries} />
          <ProtectedRoute path="/statistics" component={Statistics} />
        </Switch>
      </div>
    </>
  );
}

export default AuthorizedUserScreen;
