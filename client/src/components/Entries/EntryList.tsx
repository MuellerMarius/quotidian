import React from 'react';
import {
  Container,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { compareDesc, isSameMonth } from 'date-fns';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EntryListItemSkeleton from './EntryListItemSkeleton';
import EntryListItem from './EntryListItem';
import { useGlobalContext } from '../../context/GlobalContext';
import empty_box from './img/empty_box.svg';
import { EntryListProps } from '../../types/proptypes';
import { EntryType } from '../../types/types';

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
  containerRoot: {
    paddingTop: '65px',
    textAlign: 'center',
    opacity: 0.5,
  },
  emptyImg: {
    maxWidth: '15%',
    marginBottom: '15px',
  },
});

const byDateDesc = (a: EntryType, b: EntryType) => compareDesc(a.date, b.date);

const EntryList: React.FC<EntryListProps> = ({
  status,
  activeMonth,
  onAdd,
  onDelete,
  onEdit,
}) => {
  const { t } = useTranslation();
  const { entries } = useGlobalContext();
  const classes = useStyles();
  const sortedEntries = entries
    ?.filter((entry) => isSameMonth(entry.date, activeMonth))
    .sort(byDateDesc);

  const renderListItems = () => {
    if (status === 'loading' || status === 'idle') {
      return Array.from({ length: 10 }, (_, k) => (
        <EntryListItemSkeleton key={k} />
      ));
    }

    if (!sortedEntries || sortedEntries.length === 0) {
      <Container classes={{ root: classes.containerRoot }}>
        <img src={empty_box} alt="Empty Box" className={classes.emptyImg} />
        <Typography variant="body2">{t('no entries month')}</Typography>
      </Container>;
    }

    return sortedEntries?.map((entry) => (
      <EntryListItem
        key={entry._id}
        entry={entry}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ));
  };

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

      {renderListItems()}
    </List>
  );
};

export default React.memo(EntryList);
