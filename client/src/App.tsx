import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';
import WelcomeScreen from './screens/WelcomeScreen';
import AuthorizedUserScreen from './screens/AuthorizedUserScreen';
import ProtectedRoute from './auth/ProtectedRoute';

function App() {
  return (
    <GlobalProvider>
      <Switch>
        <Route path="/home" component={WelcomeScreen} />
        <ProtectedRoute path="/" component={AuthorizedUserScreen} />
      </Switch>
    </GlobalProvider>
  );
}

export default App;
