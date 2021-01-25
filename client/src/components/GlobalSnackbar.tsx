import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useTranslation } from 'react-i18next';
import { useGlobalContext } from '../context/GlobalContext';
import { ActionNames } from '../types/types';

const GlobalSnackbar = () => {
  const { dispatch, snackbar } = useGlobalContext();
  const { t } = useTranslation();

  const hideSnackbar = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch!({ type: ActionNames.HIDE_SNACKBAR, payload: {} });
  };

  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={snackbar.autoHideDuration || 6000}
      onClose={hideSnackbar}
    >
      <Alert onClose={hideSnackbar} severity={snackbar.severity}>
        {t(snackbar.message)}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
