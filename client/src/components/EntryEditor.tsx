import React from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next/';
import { format } from 'date-fns';
import { EntryDetailsProps } from '../types/proptypes';
import MoodSelector from './MoodSelector';

const EntryEditor: React.FC<EntryDetailsProps> = ({
  entry,
  onClose,
  onSave,
  onChange,
}) => {
  const { t } = useTranslation();

  // TODO: Error handling
  if (!entry) {
    return <>error</>;
  }

  return (
    <form style={{ padding: 25 }}>
      <Grid container direction="column" spacing={4} alignItems="center">
        <Grid item style={{ alignSelf: 'flex-start' }}>
          <Typography variant="h5" component="h5">
            {entry._id ? t('edit entry') : t('add new entry')}
          </Typography>
        </Grid>

        <Grid item>Date: {format(new Date(entry.date), 'yyyy-MM-dd')}</Grid>

        <Grid item>
          <MoodSelector
            mood={entry.mood}
            onChange={(mood) => onChange({ ...entry, mood })}
          />
        </Grid>

        <Grid item style={{ width: '100%' }}>
          <TextField
            id="comment"
            label={t('entry.comment')}
            value={entry.comment}
            onChange={(e) => onChange({ ...entry, comment: e.target.value })}
            autoComplete="false"
            fullWidth
          />
        </Grid>

        <Grid item style={{ alignSelf: 'flex-end' }}>
          <Button onClick={onClose} style={{ marginRight: 15 }}>
            {t('cancel')}
          </Button>
          <Button onClick={onSave} color="primary">
            {t('save')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EntryEditor;
