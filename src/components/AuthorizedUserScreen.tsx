import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Menu, MenuItem } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Link, Route, Switch } from 'react-router-dom';
import ProtectedRoute from '../auth/ProtectedRoute';
import Entries from './Entries';
import UserProfile from './UserProfile';
import Statistics from './Statistics';
import ProfileAvatar from './ProfileAvatar';

function AuthorizedUserScreen() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { t } = useTranslation();
  const { logout } = useAuth0();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div>
        Das ist top <Link to="/pro">Open Entries</Link> |{' '}
        <Link to="/">home</Link> | <Link to="/profile">Private Profile</Link>
        <ProfileAvatar />
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>

      <div>
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
