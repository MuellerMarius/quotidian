import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react';

import { GlobalProvider } from './context/GlobalContext';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthorizedUserScreen from './screens/AuthorizedUserScreen';
import CenteredCircularProgress from './components/CenteredCircularProgress';

function App() {
  const { t } = useTranslation();
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  return isAuthenticated ? (
    <GlobalProvider>
      <AuthorizedUserScreen />
    </GlobalProvider>
  ) : (
    <WelcomeScreen />
  );
}

export default App;
