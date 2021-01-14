import { useTranslation } from 'react-i18next';
import { useAuth0 } from '@auth0/auth0-react';

import { Button, CircularProgress } from '@material-ui/core';

function App() {
  const { t } = useTranslation();
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

  return isLoading ? (
    <CircularProgress />
  ) : (
    <div>
      <div className="App">{t('title')}</div>
      {isAuthenticated ? (
        <Button
          color="primary"
          onClick={() => logout({ returnTo: window.location.origin })}
        >
          Logout
        </Button>
      ) : (
        <Button color="primary" onClick={() => loginWithRedirect()}>
          Login
        </Button>
      )}
      <Button
        color="secondary"
        onClick={() => loginWithRedirect({ screen_hint: 'signup' })}
      >
        Signup
      </Button>
    </div>
  );
}

export default App;
