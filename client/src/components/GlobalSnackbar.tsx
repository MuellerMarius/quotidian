import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../context/GlobalContext';
import { GlobalActionNames } from '../types/contexttypes';

const GlobalSnackbar = () => {
  const { dispatch, snackbar } = useGlobalContext();
  const { t } = useTranslation();

  const hideSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({ type: GlobalActionNames.HIDE_SNACKBAR, payload: {} });
  };

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={snackbar.autoHideDuration || 4000}
      onClose={hideSnackbar}
    >
      <Alert onClose={hideSnackbar} severity={snackbar.severity}>
        {t(snackbar.message)}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
