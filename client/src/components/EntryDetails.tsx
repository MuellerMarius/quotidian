import { Button, Grid, TextField, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next/';
import moment from 'moment';
import { EntryDetailsProps } from '../types/proptypes';
import { EntryType } from '../types/types';
import MoodSelector from './MoodSelector';
import useApi from '../hooks/useApi';
import ConfirmDialog from './ConfirmDialog';

const EntryDetails: React.FC<EntryDetailsProps> = ({ entry, onClose }) => {
  const { t } = useTranslation();
  const { updateEntry, addEntry } = useApi();
  const [confirmationDialog, setConfirmationDialog] = useState<boolean>(false);
  const [changedEntry, setChangedEntry] = useState<EntryType>(entry);

  const onCancel = () => {
    if (JSON.stringify(entry) === JSON.stringify(changedEntry)) {
      onClose();
    } else {
      setConfirmationDialog(true);
    }
  };

  const onSave = () => {
    if (entry._id) {
      updateEntry(changedEntry);
    } else {
      addEntry(changedEntry);
    }
    onClose();
  };

  return (
    <form>
      <Grid container direction="column" spacing={4} alignItems="center">
        <Grid item style={{ alignSelf: 'flex-start' }}>
          <Typography variant="h5" component="h5">
            {entry._id ? t('edit entry') : t('add new entry')}
          </Typography>
        </Grid>
        <Grid item>
          <MoodSelector
            mood={changedEntry.mood}
            onChange={(mood) => setChangedEntry({ ...changedEntry, mood })}
          />
        </Grid>
        <Grid item>
          <TextField
            id="date"
            label={t('entry.date')}
            type="date"
            defaultValue={moment(changedEntry.date).format('yyyy-MM-DD')}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) =>
              setChangedEntry({
                ...changedEntry,
                date: new Date(e.target.value).toISOString(),
              })
            }
          />
        </Grid>
        <Grid item>
          <TextField
            id="comment"
            label={t('entry.comment')}
            defaultValue={entry.comment}
            onChange={(e) =>
              setChangedEntry({ ...changedEntry, comment: e.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid item style={{ alignSelf: 'flex-end' }}>
          <Button onClick={onCancel} style={{ marginRight: 15 }}>
            {t('cancel')}
          </Button>
          <Button onClick={onSave} color="primary">
            {t('save')}
          </Button>
        </Grid>
      </Grid>

      <ConfirmDialog
        title="confirm-discard.title"
        content="confirm-discard.description"
        open={confirmationDialog}
        onClose={() => setConfirmationDialog(false)}
        onConfirm={() => onClose()}
      />
    </form>
  );
};

export default EntryDetails;
