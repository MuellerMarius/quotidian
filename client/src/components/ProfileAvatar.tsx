import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Avatar,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  makeStyles,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DirectionsRunOutlinedIcon from '@material-ui/icons/DirectionsRunOutlined';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles({
  userInfo: {
    marginTop: 10,
  },
  userEmail: {
    fontWeight: 400,
    fontSize: '0.75rem',
  },
  listIcon: {
    minWidth: 32,
  },
  divider: {
    marginTop: 20,
    marginBottom: 15,
  },
  root: {
    height: 48,
    minWidth: 48,
    backgroundColor: 'none',
  },
  focusVisible: {
    outline: '1px solid #39406d',
  },
});

const ProfileAvatar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const classes = useStyles();
  const { t } = useTranslation();
  const { user, logout } = useAuth0();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        disableRipple
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleClick}
        classes={{ root: classes.root, focusVisible: classes.focusVisible }}
      >
        <Avatar alt={user.name} src={user.picture} />
        <ArrowDropDownIcon fontSize="small" color="primary" />
      </Button>

      <Menu
        id="user-menu"
        elevation={2}
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        open={Boolean(anchorEl)}
        onClose={handleClose}
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
        <ListSubheader
          component="div"
          id="user-info"
          className={classes.userInfo}
          role="none"
        >
          <Typography variant="h6" component="h2" color="primary">
            {user.name}
          </Typography>
          <Typography className={classes.userEmail} component="p">
            {user.email}
          </Typography>
        </ListSubheader>

        <Divider light className={classes.divider} />

        <MenuItem onClick={handleClose} autoFocus>
          <ListItemIcon className={classes.listIcon}>
            <PersonOutlineOutlinedIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText primary={t('edit profile')} />
        </MenuItem>

        <MenuItem onClick={handleClose}>
          <ListItemIcon className={classes.listIcon}>
            <DirectionsRunOutlinedIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText primary={t('edit acitivies')} />
        </MenuItem>

        <Divider light className={classes.divider} />

        <MenuItem onClick={() => logout()}>
          <ListItemIcon className={classes.listIcon}>
            <ExitToAppIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText primary={t('logout')} />
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileAvatar;
