import React from 'react';
import { GlobalProvider } from './context/GlobalContext';
import ProtectedMainScreen from './screens/ProtectedMainScreen';
import GlobalSnackbar from './components/GlobalSnackbar';

function App() {
  return (
    <GlobalProvider>
      <ProtectedMainScreen />
      <GlobalSnackbar />
    </GlobalProvider>
  );
}

export default App;
