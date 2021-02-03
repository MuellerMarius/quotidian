import React, { useCallback, useEffect, useState } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next/';
import { format, isSameDay } from 'date-fns';
import { EntryEditorProps } from '../types/proptypes';
import MoodSelector from './MoodSelector';
import { ActionNames, EntryType } from '../types/types';
import { useGlobalContext } from '../context/GlobalContext';
import useApi from '../hooks/useApi';

const EntryEditor: React.FC<EntryEditorProps> = ({ setDialog }) => {
  const { t } = useTranslation();
  const { selectedDate, entries, dispatch } = useGlobalContext();
  const { updateEntry, addEntry } = useApi();
  const [editedEntry, setEditedEntry] = useState<EntryType | null | undefined>(
    undefined
  );

  const getOriginalEntry = useCallback(
    (date: Date) => {
      let entry = entries?.find((elem) => isSameDay(new Date(elem.date), date));

      if (!entry) {
        entry = {
          mood: 3,
          date: date.toISOString(),
          comment: '',
        };
      }
      return entry;
    },
    [entries]
  );

  const selectDate = useCallback(
    (date: Date | null) => {
      dispatch!({ type: ActionNames.SELECT_DATE, payload: { date } });
    },
    [dispatch]
  );

  const hasEntryChanged = useCallback(() => {
    if (!editedEntry) {
      return false;
    }
    return (
      JSON.stringify(getOriginalEntry(new Date(editedEntry.date))) !==
      JSON.stringify(editedEntry)
    );
  }, [editedEntry, getOriginalEntry]);

  const saveEntry = () => {
    if (!editedEntry) {
      dispatch!({
        type: ActionNames.SHOW_SNACKBAR,
        payload: {
          snackbar: {
            open: true,
            severity: 'error',
            message: 'snackbar.failed-save',
          },
        },
      });
      return;
    }

    if (editedEntry!._id) {
      updateEntry(editedEntry);
    } else {
      addEntry(editedEntry);
    }
    selectDate(null);
  };

  const handleClose = () => {
    if (!hasEntryChanged()) {
      selectDate(null);
      return;
    }

    setDialog({
      open: true,
      title: 'confirm-discard.title',
      content: 'confirm-discard.description',
      onConfirm: () => selectDate(null),
    });
  };

  useEffect(() => {
    const hasDateChanged = () => {
      if (editedEntry?.date && selectedDate) {
        if (isSameDay(new Date(editedEntry.date), selectedDate)) {
          return false;
        }
      }
      return true;
    };

    const setEditorStateToDate = (date: Date) => {
      setEditedEntry(getOriginalEntry(date));
    };

    if (!hasDateChanged()) {
      return;
    }

    if (!selectedDate) {
      setEditedEntry(null);
      return;
    }

    if (!editedEntry || !hasEntryChanged()) {
      setEditorStateToDate(selectedDate);
      return;
    }

    setDialog({
      open: true,
      title: 'confirm-discard-due-datechange.title',
      content: 'confirm-discard-due-datechange.description',
      onCancel: () => selectDate(new Date(editedEntry!.date)),
      onConfirm: () => setEditorStateToDate(selectedDate),
    });
  }, [
    editedEntry,
    entries,
    selectDate,
    selectedDate,
    setDialog,
    hasEntryChanged,
    getOriginalEntry,
  ]);

  // TODO: Error handling
  if (!editedEntry) {
    return <>error</>;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    saveEntry();
    e.preventDefault();
  };

  return (
    <form style={{ padding: 25 }} onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={4} alignItems="center">
        <Grid item style={{ alignSelf: 'flex-start' }}>
          <Typography variant="h5" component="h5">
            {editedEntry._id ? t('edit entry') : t('add new entry')}
          </Typography>
        </Grid>

        <Grid item>
          Date: {format(new Date(editedEntry.date), 'yyyy-MM-dd')}
        </Grid>

        <Grid item>
          <MoodSelector
            mood={editedEntry.mood}
            onChange={(mood) => setEditedEntry({ ...editedEntry, mood })}
          />
        </Grid>

        <Grid item style={{ width: '100%' }}>
          <TextField
            id="comment"
            label={t('entry.comment')}
            value={editedEntry.comment}
            onChange={(e) =>
              setEditedEntry({ ...editedEntry, comment: e.target.value })
            }
            autoComplete="false"
            fullWidth
          />
        </Grid>

        <Grid item style={{ alignSelf: 'flex-end' }}>
          <Button onClick={handleClose} style={{ marginRight: 15 }}>
            {t('cancel')}
          </Button>
          <Button onClick={saveEntry} color="primary">
            {t('save')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EntryEditor;
