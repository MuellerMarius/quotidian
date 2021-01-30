import React, { useState } from 'react';
import {
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Slide,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EntryListItem from './EntryListItem';
import { useGlobalContext } from '../context/GlobalContext';
import useApi from '../hooks/useApi';
import EntryListItemSkeleton from './EntryListItemSkeleton';
import ConfirmDialog from './ConfirmDialog';
import {
  EntryDetailsState,
  ConfirmDeleteState,
  EntryType,
  ActionNames,
} from '../types/types';
import { ScreenProps } from '../types/proptypes';
import EntryDetails from './EntryDetails';

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
    padding: 25,
  },
  scrollableList: {
    height: '100%',
    overflow: 'auto',
  },
  stickyHeader: {
    position: 'sticky',
    top: 0,
    backgroundColor: '#F7F9FB',
    paddingTop: 25,
    paddingBottom: 25,
    zIndex: 10,
    '&:hover': {
      backgroundColor: '#F7F9FB',
    },
  },
});

const Entries: React.FC<ScreenProps> = ({ status }) => {
  const { entries, dispatch } = useGlobalContext();
  const { addEntry, deleteEntry } = useApi();
  const { t } = useTranslation();
  const classes = useStyles();
  const [
    confirmationDialog,
    setConfirmationDialog,
  ] = useState<ConfirmDeleteState>({
    open: false,
    entry: null,
  });
  const [entryDetails, setEntryDetails] = useState<EntryDetailsState>({
    open: false,
    component: null,
  });

  // TODO: Error handling
  if (status === 'error') {
    return <Card>error</Card>;
  }

  const showEntryDetails = (component: JSX.Element) => {
    setEntryDetails({ open: true, component });
  };

  const hideEntryDetails = () => {
    setEntryDetails({ open: false, component: entryDetails.component });
  };

  const showConfirmationDialog = (entry: EntryType) => {
    setConfirmationDialog({ open: true, entry });
  };

  const hideConfirmationDialog = () => {
    setConfirmationDialog({ open: false, entry: null });
  };

  const addEntryAction = () => {
    const entry = { mood: 3, date: new Date().toISOString(), comment: '' };
    showEntryDetails(<EntryDetails entry={entry} onClose={hideEntryDetails} />);
  };

  const deleteEntryConfirmed = () => {
    if (confirmationDialog.entry) {
      deleteEntry(confirmationDialog.entry!);
    } else {
      dispatch!({
        type: ActionNames.SHOW_SNACKBAR,
        payload: {
          snackbar: {
            message: 'snackbar.failed-delete',
            severity: 'error',
          },
        },
      });
    }
    hideConfirmationDialog();
  };

  return (
    <Card className={classes.card}>
      <Slide direction="left" in={entryDetails.open} mountOnEnter unmountOnExit>
        <div className={classes.slide}>{entryDetails.component}</div>
      </Slide>

      <Slide direction="right" appear={false} in={!entryDetails.open}>
        <List disablePadding className={classes.scrollableList}>
          <ListItem
            button
            onClick={() => addEntryAction()}
            alignItems="center"
            className={classes.stickyHeader}
          >
            <ListItemIcon>
              <AddCircleIcon fontSize="large" color="primary" />
            </ListItemIcon>
            <ListItemText primary={t('add new entry')} />
          </ListItem>
          {status === 'loading' || status === 'idle'
            ? Array.from({ length: 10 }, (_, k) => (
                <EntryListItemSkeleton key={k} />
              ))
            : entries?.map((entry) => (
                <EntryListItem
                  entry={entry}
                  onClick={showEntryDetails}
                  onClose={hideEntryDetails}
                  confirmDelete={showConfirmationDialog}
                  key={entry._id}
                />
              ))}
        </List>
      </Slide>

      <ConfirmDialog
        title="confirm-delete.title"
        content="confirm-delete.description"
        open={confirmationDialog.open}
        onClose={() => hideConfirmationDialog()}
        onConfirm={() => deleteEntryConfirmed()}
      />
    </Card>
  );
};

export default Entries;
