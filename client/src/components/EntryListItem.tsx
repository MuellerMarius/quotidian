import React from 'react';
import {
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import MoodAvatar from './MoodAvatar';
import { EntryListItemProps } from '../types/proptypes';

const EntryListItem: React.FC<EntryListItemProps> = ({
  entry,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();
  const { mood, comment, date } = entry;

  return (
    <>
      <Divider variant="middle" component="li" light />
      <ListItem
        button
        alignItems="center"
        onClick={() => onEdit(entry)}
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <ListItemIcon>
          <MoodAvatar mood={mood} />
        </ListItemIcon>

        <ListItemText
          primary={t('datekey', { date: new Date(date) })}
          secondary={comment}
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
