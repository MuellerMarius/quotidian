import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import CenteredCircularProgress from './components/CenteredCircularProgress';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './i18n';
import './style/index.scss';
import { theme } from './style/theme';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <AuthProvider>
          <Suspense fallback={<CenteredCircularProgress />}>
            <App />
          </Suspense>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
