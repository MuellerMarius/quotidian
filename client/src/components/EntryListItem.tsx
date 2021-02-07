import React from 'react';
import {
  Avatar,
  Chip,
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import MoodAvatar from './MoodAvatar';
import { EntryListItemProps } from '../types/proptypes';

const useStyles = makeStyles({
  listitemroot: {
    marginTop: 10,
    marginBottom: 10,
  },
  secondary: {
    marginTop: 8,
  },
  chiproot: {
    marginRight: 8,
  },
});

const SecondaryItem: React.FC<{ comment: string }> = ({ comment }) => {
  const classes = useStyles();

  return (
    <>
      <Chip
        variant="outlined"
        size="small"
        avatar={<Avatar component="span">F</Avatar>}
        label="Sport"
        component="span"
        classes={{ root: classes.chiproot }}
      />
      <Chip
        variant="outlined"
        size="small"
        avatar={<Avatar component="span">F</Avatar>}
        label="Vietnamese"
        component="span"
        classes={{ root: classes.chiproot }}
      />
      {comment}
    </>
  );
};

const EntryListItem: React.FC<EntryListItemProps> = ({
  entry,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { mood, comment, date } = entry;

  return (
    <>
      <Divider variant="middle" component="li" light />
      <ListItem
        button
        alignItems="center"
        onClick={() => onEdit(entry)}
        classes={{ root: classes.listitemroot }}
      >
        <ListItemIcon>
          <MoodAvatar mood={mood} />
        </ListItemIcon>

        <ListItemText
          primary={t('datekey', { date: new Date(date) })}
          secondary={<SecondaryItem comment={comment} />}
          classes={{ secondary: classes.secondary }}
        />
        <ListItemSecondaryAction>
          <IconButton aria-label="delete" onClick={() => onDelete(entry)}>
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
};

export default React.memo(EntryListItem);
