import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next/';
import { isSameDay } from 'date-fns';
import { EntryEditorProps } from '../../types/proptypes';
import MoodSelector from './MoodSelector';
import { ActionNames, EntryType } from '../../types/types';
import { useGlobalContext } from '../../context/GlobalContext';
import useApi from '../../hooks/useApi';
import ActivitySelector from './ActivitySelector';

const useStyles = makeStyles({
  form: {
    padding: 25,
  },
  flexStart: {
    alignSelf: 'flex-start',
  },
  flexEnd: {
    alignSelf: 'flex-end',
  },
  fullWidth: {
    width: '100%',
  },
  submitBtn: {
    marginLeft: 15,
  },
});

const EntryEditor: React.FC<EntryEditorProps> = ({ setDialog }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { selectedDate, entries, dispatch } = useGlobalContext();
  const { dbUpdate, dbAdd } = useApi();
  const [editedEntry, setEditedEntry] = useState<EntryType | null | undefined>(
    undefined
  );

  const getOriginalEntry = useCallback(
    (date: Date) => {
      let entry = entries?.find((elem) => isSameDay(elem.date, date));

      if (!entry) {
        entry = { mood: 3, date, comment: '', activities: [] };
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
    const originalEntry = getOriginalEntry(editedEntry.date);
    return JSON.stringify(originalEntry) !== JSON.stringify(editedEntry);
  }, [editedEntry, getOriginalEntry]);

  useEffect(() => {
    const hasDateChanged = () => {
      if (editedEntry?.date && selectedDate) {
        if (isSameDay(editedEntry.date, selectedDate)) {
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
      onCancel: () => selectDate(editedEntry!.date),
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

  if (!editedEntry) {
    // no entry currently selected
    return null;
  }

  const saveEntry = () => {
    if (editedEntry._id) {
      dbUpdate(editedEntry);
    } else {
      dbAdd(editedEntry);
    }
    selectDate(null);
  };

  const handleActivityChange = (activity: string) => {
    if (editedEntry.activities.includes(activity)) {
      // remove activity
      const activities = editedEntry.activities.filter((a) => a !== activity);
      setEditedEntry({ ...editedEntry, activities });
    } else {
      // add activity
      const activities = [...editedEntry.activities, activity];
      setEditedEntry({ ...editedEntry, activities });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    saveEntry();
    e.preventDefault();
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

  // TODO: if only 1 cat -> Comment & Buttons flicker
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={4} alignItems="center">
        <Grid item classes={{ root: classes.flexStart }}>
          <Typography variant="h5" component="h5">
            {editedEntry._id ? t('edit entry') : t('add new entry')}
          </Typography>
        </Grid>

        <Grid item>
          <Typography color="secondary">
            {t('datekey', { date: editedEntry.date })}
          </Typography>
        </Grid>

        <Grid item>
          <MoodSelector
            mood={editedEntry.mood}
            onChange={(mood) => setEditedEntry({ ...editedEntry, mood })}
          />
        </Grid>

        <Grid item classes={{ root: classes.fullWidth }}>
          <ActivitySelector
            active={editedEntry.activities}
            onChange={handleActivityChange}
          />
        </Grid>

        <Grid item classes={{ root: classes.fullWidth }}>
          <TextField
            id="comment"
            label={t('entry.comment')}
            value={editedEntry.comment}
            onChange={(e) =>
              setEditedEntry({ ...editedEntry, comment: e.target.value })
            }
            InputProps={{ autoComplete: 'off' }}
            fullWidth
          />
        </Grid>

        <Grid item classes={{ root: classes.flexEnd }}>
          <Button onClick={handleClose} disableRipple>
            {t('cancel')}
          </Button>

          <Button onClick={saveEntry} classes={{ root: classes.submitBtn }}>
            {t('save')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EntryEditor;
