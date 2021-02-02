import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth0ProviderWithHistory from './auth/Auth0ProviderWithHistory';
import './style/index.scss';
import { theme } from './style/theme';
import App from './App';

import './i18n';
import CenteredCircularProgress from './components/CenteredCircularProgress';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Auth0ProviderWithHistory>
          <Suspense fallback={<CenteredCircularProgress />}>
            <App />
          </Suspense>
        </Auth0ProviderWithHistory>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
