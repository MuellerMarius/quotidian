import {
  Divider,
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MoreVert from '@material-ui/icons/MoreVert';
import { EntryListItemProps } from '../types/proptypes';
import MoodAvatar from './MoodAvatar';
import useApi from '../hooks/useApi';
import EntryDetails from './EntryDetails';

const EntryListItem: React.FC<EntryListItemProps> = ({
  entry,
  onClick,
  onClose,
  confirmDelete,
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

  return (
    <>
      <Divider variant="middle" component="li" light />
      <ListItem
        button
        alignItems="center"
        onClick={() =>
          onClick(<EntryDetails entry={entry} onClose={onClose} />)
        }
        style={{ marginTop: 10, marginBottom: 10 }}
      >
        <MoodAvatar mood={mood} />
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
        <MenuItem onClick={() => closeMenu()}>
          <ListItemText primary={t('edit')} />
        </MenuItem>
        <MenuItem
          onClick={() => {
            closeMenu();
            confirmDelete(entry);
          }}
        >
          <ListItemText primary={t('delete')} />
        </MenuItem>
      </Menu>
    </>
  );
};

export default EntryListItem;
