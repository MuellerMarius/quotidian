import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthorizedUserScreen from './screens/AuthorizedUserScreen';
import ProtectedRoute from './auth/ProtectedRoute';
import GlobalSnackbar from './components/GlobalSnackbar';

function App() {
  return (
    <GlobalProvider>
      <Switch>
        <Route path="/home" component={WelcomeScreen} />
        <ProtectedRoute path="/" component={AuthorizedUserScreen} />
      </Switch>
      <GlobalSnackbar />
    </GlobalProvider>
  );
}

export default App;
