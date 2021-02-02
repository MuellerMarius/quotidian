import React from 'react';
import { Card, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { ScreenProps } from '../types/proptypes';
import Entries from '../components/Entries';
import Calendar from '../components/Calendar/Calendar';

const EntryScreen: React.FC<ScreenProps> = ({ status }) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <Card>
          <Entries status={status} />
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <Calendar />
        </Card>
      </Grid>
    </Grid>
  );
};

export default EntryScreen;
