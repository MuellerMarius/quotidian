import React, { useCallback, useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next/';
import { isSameDay } from 'date-fns';
import { EntryEditorProps } from '../types/proptypes';
import MoodSelector from './MoodSelector';
import { ActionNames, EntryType } from '../types/types';
import { useGlobalContext } from '../context/GlobalContext';
import useApi from '../hooks/useApi';

const useStyles = makeStyles({
  form: {
    padding: 25,
  },
  chipRoot: {
    marginRight: 7,
    marginBottom: 5,
  },
  dividerRoot: {
    marginTop: 8,
    marginBottom: 5,
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
  cancelBtn: {
    marginRight: 15,
  },
});

const EntryEditor: React.FC<EntryEditorProps> = ({ setDialog }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { selectedDate, entries, dispatch } = useGlobalContext();
  const { updateEntry, addEntry } = useApi();
  const [editedEntry, setEditedEntry] = useState<EntryType | null | undefined>(
    undefined
  );

  const getOriginalEntry = useCallback(
    (date: Date) => {
      let entry = entries?.find((elem) => isSameDay(elem.date, date));

      if (!entry) {
        entry = { mood: 3, date, comment: '' };
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
      updateEntry(editedEntry);
    } else {
      addEntry(editedEntry);
    }
    selectDate(null);
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
            autoFocus
          />
        </Grid>

        <Grid item classes={{ root: classes.fullWidth }}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="subtitle1" component="h5">
                {t('activities')}
              </Typography>

              <Typography variant="subtitle2" component="h5" color="secondary">
                Diverses
              </Typography>
              <Chip
                color="primary"
                avatar={<Avatar>F</Avatar>}
                label="Sport"
                classes={{ root: classes.chipRoot }}
                clickable
              />
              <Chip
                variant="outlined"
                avatar={<Avatar>V</Avatar>}
                label="Vietnamesisch"
                classes={{ root: classes.chipRoot }}
                clickable
              />
              <Chip
                variant="outlined"
                avatar={<Avatar>M</Avatar>}
                label="Meditation"
                classes={{ root: classes.chipRoot }}
                clickable
              />
              <Divider classes={{ root: classes.dividerRoot }} />
              <Typography variant="subtitle2" component="h5" color="secondary">
                Sport
              </Typography>
              <Chip
                variant="outlined"
                avatar={<Avatar>V</Avatar>}
                label="Vietnamesisch"
                classes={{ root: classes.chipRoot }}
                clickable
              />
              <Chip
                variant="outlined"
                avatar={<Avatar>M</Avatar>}
                label="Meditation"
                classes={{ root: classes.chipRoot }}
                clickable
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item classes={{ root: classes.fullWidth }}>
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

        <Grid item classes={{ root: classes.flexEnd }}>
          <Button onClick={handleClose} classes={{ root: classes.cancelBtn }}>
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
