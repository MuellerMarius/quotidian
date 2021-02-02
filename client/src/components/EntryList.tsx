import React from 'react';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EntryListItemSkeleton from './EntryListItemSkeleton';
import EntryListItem from './EntryListItem';
import { useGlobalContext } from '../context/GlobalContext';
import { EntryListProps } from '../types/proptypes';

const useStyles = makeStyles({
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

const EntryList: React.FC<EntryListProps> = ({
  onAdd,
  onEdit,
  onDelete,
  status,
}) => {
  const { t } = useTranslation();
  const { entries } = useGlobalContext();
  const classes = useStyles();

  return (
    <List disablePadding className={classes.scrollableList}>
      <ListItem
        button
        alignItems="center"
        onClick={() => onAdd()}
        className={classes.stickyHeader}
      >
        <ListItemIcon>
          <AddCircleIcon fontSize="large" color="primary" />
        </ListItemIcon>
        <ListItemText primary={t('add todays entry')} />
      </ListItem>

      {status === 'loading' || status === 'idle'
        ? Array.from({ length: 10 }, (_, k) => (
            <EntryListItemSkeleton key={k} />
          ))
        : entries?.map((entry) => (
            <EntryListItem
              entry={entry}
              onEdit={() => onEdit(entry)}
              onDelete={() => onDelete(entry)}
              key={entry._id}
            />
          ))}
    </List>
  );
};
export default EntryList;
