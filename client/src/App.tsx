import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react';

import WelcomeScreen from './components/WelcomeScreen';
import AuthorizedUserScreen from './components/AuthorizedUserScreen';

function App() {
  const { t } = useTranslation();
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <CircularProgress />;
  }

  return isAuthenticated ? <AuthorizedUserScreen /> : <WelcomeScreen />;
}

export default App;
