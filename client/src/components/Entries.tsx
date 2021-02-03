import React, { useCallback, useEffect, useState } from 'react';
import { Card, makeStyles, Slide } from '@material-ui/core';
import { useGlobalContext } from '../context/GlobalContext';
import useApi from '../hooks/useApi';
import ConfirmDialog from './ConfirmDialog';
import { DialogState, EntryType, ActionNames } from '../types/types';
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

const Entries: React.FC<ScreenProps> = ({ status }) => {
  const classes = useStyles();
  const { selectedDate, dispatch } = useGlobalContext();
  const { deleteEntry } = useApi();
  const [isEntryEditorOpen, setEntryEditorOpen] = useState<boolean>(false);
  const [dialog, setDialog] = useState<DialogState>(initialDialogState);

  const selectDate = useCallback(
    (date: Date | null) => {
      dispatch!({ type: ActionNames.SELECT_DATE, payload: { date } });
    },
    [dispatch]
  );

  const deleteEntryConfirmed = useCallback(
    (entry: EntryType) => {
      setDialog({
        open: true,
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

  useEffect(() => {
    selectDate(null);
  }, [selectDate]);

  useEffect(() => {
    setEntryEditorOpen(Boolean(selectedDate));
  }, [selectedDate]);

  // TODO: Error handling
  if (status === 'error') {
    return <Card>error</Card>;
  }

  return (
    <Card className={classes.card}>
      <Slide direction="left" in={isEntryEditorOpen} mountOnEnter unmountOnExit>
        <div className={classes.slide}>
          <EntryEditor setDialog={setDialog} />
        </div>
      </Slide>
      <Slide direction="right" appear={false} in={!isEntryEditorOpen}>
        <div className={classes.slide}>
          <EntryList
            status={status}
            onAdd={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
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
