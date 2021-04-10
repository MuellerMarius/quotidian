import React, { useEffect, useState } from 'react';
import { GlobalProvider } from './context/GlobalContext';
import ProtectedMainScreen from './screens/ProtectedMainScreen';
import GlobalSnackbar from './components/GlobalSnackbar';
import WelcomeScreen from './screens/WelcomeScreen';
import { useAuth } from './context/AuthContext';
import CenteredCircularProgress from './components/CenteredCircularProgress';

function App() {
  const { isAuthenticated, auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    auth()
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [auth]);

  if (isLoading) {
    return <CenteredCircularProgress />;
  }

  return (
    <GlobalProvider>
      {isAuthenticated ? <ProtectedMainScreen /> : <WelcomeScreen />}
      <GlobalSnackbar />
    </GlobalProvider>
  );
}

export default App;
