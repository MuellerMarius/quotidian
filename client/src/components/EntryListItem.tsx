import React, { useState } from 'react';
import {
  Divider,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import MoreVert from '@material-ui/icons/MoreVert';
import MoodAvatar from './MoodAvatar';
import { EntryListItemProps } from '../types/proptypes';

const EntryListItem: React.FC<EntryListItemProps> = ({
  entry,
  selectDate,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { mood, comment, date } = entry;

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    event.preventDefault();
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    closeMenu();
    onEdit(entry);
  };

  const handleDelete = () => {
    closeMenu();
    onDelete(entry);
  };

  return (
    <>
      <Divider variant="middle" component="li" light />
      <ListItem
        button
        alignItems="center"
        onClick={() => selectDate(new Date(entry.date))}
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
          <IconButton
            aria-label="settings"
            aria-controls="settings-menu"
            aria-haspopup="true"
            onClick={openMenu}
          >
            <MoreVert fontSize="small" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>

      <Menu
        id="settings-menu"
        elevation={2}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        onClose={() => closeMenu()}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        keepMounted
      >
        <MenuItem onClick={handleEdit}>
          <ListItemText primary={t('edit')} />
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <ListItemText primary={t('delete')} />
        </MenuItem>
      </Menu>
    </>
  );
};

export default React.memo(EntryListItem);
