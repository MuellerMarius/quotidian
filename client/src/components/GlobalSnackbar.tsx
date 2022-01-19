import React from 'react';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../context/GlobalContext';
import { GlobalActionNames } from '../types/contexttypes';

const GlobalSnackbar = () => {
  const { dispatch, snackbar } = useGlobalContext();
  const { t } = useTranslation();

  const hideSnackbar = (
    event?: Event | React.SyntheticEvent<any, Event>,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({ type: GlobalActionNames.HIDE_SNACKBAR, payload: {} });
  };

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={snackbar.autoHideDuration || 4000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={hideSnackbar}
    >
      <Alert onClose={hideSnackbar} severity={snackbar.severity}>
        {t(snackbar.message)}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
