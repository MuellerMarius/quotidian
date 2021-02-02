import React, { useCallback, useEffect, useState } from 'react';
import { Card, makeStyles, Slide } from '@material-ui/core';
import { isSameDay } from 'date-fns';
import { useGlobalContext } from '../context/GlobalContext';
import useApi from '../hooks/useApi';
import ConfirmDialog from './ConfirmDialog';
import {
  EntryEditState,
  DialogState,
  EntryType,
  ActionNames,
} from '../types/types';
import { ScreenProps } from '../types/proptypes';
import EntryEditor from './EntryEditor';
import EntryList from './EntryList';

const useStyles = makeStyles({
  card: {
    position: 'relative',
    height: '70vh',
  },
  slide: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99,
  },
});

const initialDialogState = {
  open: false,
  entry: null,
  title: '',
  content: '',
};

const initEntryEditState = {
  open: false,
  entry: null,
  editedEntry: null,
};

const Entries: React.FC<ScreenProps> = ({ status }) => {
  const classes = useStyles();
  const { selectedDate, entries, dispatch } = useGlobalContext();
  const { updateEntry, addEntry, deleteEntry } = useApi();
  const [dialog, setDialog] = useState<DialogState>(initialDialogState);
  const [entryEditor, setEntryEditor] = useState<EntryEditState>(
    initEntryEditState
  );

  const hideEntryEditor = () => {
    setEntryEditor({ open: false, entry: null, editedEntry: null });
  };

  const selectDate = useCallback(
    (date: Date | null) => {
      dispatch!({ type: ActionNames.SELECT_DATE, payload: { date } });
    },
    [dispatch]
  );

  const saveEditedEntry = () => {
    if (!entryEditor.editedEntry) {
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

    if (entryEditor.editedEntry!._id) {
      updateEntry(entryEditor.editedEntry);
    } else {
      addEntry(entryEditor.editedEntry);
    }

    hideEntryEditor();
    selectDate(null);
  };

  const deleteEntryConfirmed = useCallback(
    (entry: EntryType) => {
      setDialog({
        open: true,
        entry,
        title: 'confirm-delete.title',
        content: 'confirm-delete.description',
        onConfirm: () => deleteEntry(entry),
      });
    },
    [deleteEntry]
  );

  const onAdd = useCallback(() => selectDate(new Date()), [selectDate]);

  const onEdit = useCallback((e: EntryType) => selectDate(new Date(e.date)), [
    selectDate,
  ]);

  const onDelete = useCallback((e: EntryType) => deleteEntryConfirmed(e), [
    deleteEntryConfirmed,
  ]);

  // Handle selected date change
  useEffect(() => {
    const hasDateChanged = () => {
      if (entryEditor.editedEntry?.date && selectedDate) {
        if (isSameDay(new Date(entryEditor.editedEntry.date), selectedDate)) {
          return false;
        }
      }
      if (!entryEditor.editedEntry && !selectedDate) {
        return false;
      }
      return true;
    };

    const hasEntryChanged = () =>
      JSON.stringify(entryEditor.entry) !==
      JSON.stringify(entryEditor.editedEntry);

    const getEntryOrCreateNew = (date: Date) => {
      let entry = entries?.find((elem) => isSameDay(new Date(elem.date), date));
      if (!entry) {
        entry = { mood: 3, date: date.toISOString(), comment: '' };
      }
      return entry;
    };

    if (!hasDateChanged()) {
      return;
    }

    if (!entryEditor.open && selectedDate) {
      const entry = getEntryOrCreateNew(selectedDate);
      setEntryEditor({ open: true, entry, editedEntry: entry });
      return;
    }

    if (!selectedDate) {
      if (!hasEntryChanged()) {
        hideEntryEditor();
        return;
      }

      setDialog({
        open: true,
        entry: entryEditor.editedEntry,
        title: 'confirm-discard.title',
        content: 'confirm-discard.description',
        onCancel: () => selectDate(new Date(entryEditor.editedEntry!.date)),
        onConfirm: () => hideEntryEditor(),
      });
      return;
    }

    const entryOnSelectedDate = getEntryOrCreateNew(selectedDate);

    if (!hasEntryChanged()) {
      setEntryEditor({
        open: true,
        entry: entryOnSelectedDate,
        editedEntry: entryOnSelectedDate,
      });
      return;
    }

    setDialog({
      open: true,
      entry: entryEditor.editedEntry,
      title: 'confirm-discard-due-datechange.title',
      content: 'confirm-discard-due-datechange.description',
      onCancel: () => selectDate(new Date(entryEditor.editedEntry!.date)),
      onConfirm: () =>
        setEntryEditor({
          open: true,
          entry: entryOnSelectedDate,
          editedEntry: entryOnSelectedDate,
        }),
    });
  }, [dispatch, entries, entryEditor, selectedDate, selectDate]);

  // TODO: Error handling
  if (status === 'error') {
    return <Card>error</Card>;
  }

  return (
    <Card className={classes.card}>
      <Slide direction="left" in={entryEditor.open} mountOnEnter unmountOnExit>
        <div className={classes.slide}>
          <EntryEditor
            entry={entryEditor.editedEntry}
            onClose={() => selectDate(null)}
            onSave={saveEditedEntry}
            onChange={(editedEntry) =>
              setEntryEditor({ ...entryEditor, editedEntry })
            }
          />
        </div>
      </Slide>
      <Slide direction="right" appear={false} in={!entryEditor.open}>
        <div className={classes.slide}>
          <EntryList
            status={status}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
            selectDate={selectDate}
          />
        </div>
      </Slide>
      <ConfirmDialog
        title={dialog.title}
        content={dialog.content}
        open={dialog.open}
        onClose={() => setDialog({ ...dialog, open: false })}
        onCancel={dialog.onCancel}
        onConfirm={dialog.onConfirm}
      />
    </Card>
  );
};

export default Entries;
