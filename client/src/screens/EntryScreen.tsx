import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import { EntryScreenProps } from '../types/proptypes';
import Entries from '../components/Entries';
import Calendar from '../components/Calendar';

const EntryScreen: React.FC<EntryScreenProps> = ({ status }) => {
  const [activeMonth, setActiveMonth] = useState<Date>(new Date());

  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <Entries status={status} activeMonth={activeMonth} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Calendar activeMonth={activeMonth} setActiveMonth={setActiveMonth} />
      </Grid>
    </Grid>
  );
};

export default EntryScreen;
