import React, { useCallback, useEffect, useState } from 'react';
import { Card, makeStyles, Slide } from '@material-ui/core';
import { useGlobalContext } from '../../context/GlobalContext';
import useApi from '../../hooks/useApi';
import ConfirmDialog from '../ConfirmDialog';
import { DialogState, EntryType, ActionNames } from '../../types/types';
import { EntriesProps } from '../../types/proptypes';
import EntryEditor from '../EntryEditor';
import EntryList from './EntryList';

const useStyles = makeStyles({
  card: {
    position: 'relative',
    height: '73vh',
  },
  slide: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#FFFFFF',
    overflow: 'auto',
    zIndex: 99,
  },
});

const initialDialogState = {
  open: false,
  entry: null,
  title: '',
  content: '',
};

const Entries: React.FC<EntriesProps> = ({ status, activeMonth }) => {
  const classes = useStyles();
  const { selectedDate, dispatch } = useGlobalContext();
  const { dbDelete } = useApi();
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
        onConfirm: () => dbDelete(entry),
      });
    },
    [dbDelete]
  );

  const onAdd = useCallback(() => selectDate(new Date()), [selectDate]);

  const onEdit = useCallback((e: EntryType) => selectDate(e.date), [
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
    <Card className={classes.card} elevation={0}>
      <Slide direction="left" in={isEntryEditorOpen} mountOnEnter unmountOnExit>
        <div className={classes.slide}>
          <EntryEditor setDialog={setDialog} />
        </div>
      </Slide>

      <EntryList
        status={status}
        activeMonth={activeMonth}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
      />

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
