import React from 'react';
import { Card, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ScreenProps } from '../types/types';
import Entries from '../components/Entries';

const EntryScreen: React.FC<ScreenProps> = ({ status }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} lg={6}>
        <Card>
          <Entries status={status} />
        </Card>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card>Cal</Card>
      </Grid>
    </Grid>
  );
};

export default EntryScreen;
