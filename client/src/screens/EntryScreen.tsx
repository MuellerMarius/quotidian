import React, { useState } from 'react';
import { Card, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { EntryScreenProps } from '../types/proptypes';
import Entries from '../components/Entries';
import Calendar from '../components/Calendar';

const EntryScreen: React.FC<EntryScreenProps> = ({ status }) => {
  const { t } = useTranslation();
  const [activeMonth, setActiveMonth] = useState<Date>(new Date());

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <Card>
          <Entries status={status} activeMonth={activeMonth} />
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <Calendar activeMonth={activeMonth} setActiveMonth={setActiveMonth} />
        </Card>
      </Grid>
    </Grid>
  );
};

export default EntryScreen;
