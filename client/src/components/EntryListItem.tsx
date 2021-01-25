import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import MoreVert from '@material-ui/icons/MoreVert';
import { EntryListItemProps, ActionNames } from '../types/types';
import MoodAvatar from './MoodAvatar';
import useApi from '../hooks/useApi';
import { useGlobalContext } from '../context/GlobalContext';

const EntryListItem: React.FC<EntryListItemProps> = ({ entry }) => {
  const { t } = useTranslation();
  const { status, deleteEntry } = useApi();
  const [confirmDelete, showConfirmDelete] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { mood, comment, date } = entry;
  const { dispatch } = useGlobalContext();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (lang?: string) => {
    setAnchorEl(null);
  };

  // TODO: Create contextmenu and click-action for items
  return (
    <>
      <Divider variant="middle" component="li" light />
      <ListItem alignItems="center" style={{ marginTop: 10, marginBottom: 10 }}>
        <MoodAvatar mood={mood} />
        <ListItemText
          primary={t('datekey', { date: new Date(date) })}
          secondary={status}
        />
        <IconButton
          aria-label="settings"
          aria-controls="settings-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVert fontSize="small" />
        </IconButton>
        <Menu
          id="settings-menu"
          elevation={2}
          anchorEl={anchorEl}
          getContentAnchorEl={null}
          open={Boolean(anchorEl)}
          onClose={() => handleClose()}
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
          <MenuItem onClick={() => handleClose()}>
            <ListItemText primary={t('edit')} />
          </MenuItem>
          <MenuItem onClick={() => showConfirmDelete(true)}>
            <ListItemText primary={t('delete')} />
          </MenuItem>
        </Menu>
      </ListItem>
      <Dialog
        open={confirmDelete}
        onClose={() => showConfirmDelete(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {t('confirm-delete.title')}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('confirm-delete.description')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => showConfirmDelete(false)} color="primary">
            {t('cancel')}
          </Button>
          <Button onClick={() => deleteEntry(entry)} color="primary" autoFocus>
            {t('confirm')}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EntryListItem;
