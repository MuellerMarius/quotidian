import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import CenteredCircularProgress from './components/CenteredCircularProgress';
import { AuthProvider } from './context/AuthContext';
import App from './App';
import './i18n';
import './style/index.scss';
import { theme } from './style/theme';

declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme {}
}

ReactDOM.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Router>
          <AuthProvider>
            <Suspense fallback={<CenteredCircularProgress />}>
              <App />
            </Suspense>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
