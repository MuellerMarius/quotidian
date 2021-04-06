import React, { useState } from 'react';
import {
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
import { Skeleton } from '@material-ui/lab';
import Avatar from 'avataaars';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DirectionsRunOutlinedIcon from '@material-ui/icons/DirectionsRunOutlined';
import { useTranslation } from 'react-i18next';
import LinkMenuItem from './LinkMenuItem';
import { useAuth } from '../context/AuthContext';

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
  const { user, logout } = useAuth();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!user) {
    return (
      <Skeleton
        variant="circle"
        width={34}
        height={34}
        style={{ marginRight: 34 }}
      />
    );
  }

  return (
    <>
      <Button
        disableRipple
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleClick}
        classes={{ root: classes.root, focusVisible: classes.focusVisible }}
      >
        {/* TODO: background color: https://github.com/fangpenlin/avataaars/pull/25 */}
        <Avatar
          style={{ width: '40px', height: '40px' }}
          avatarStyle="Circle"
          topType={user.avatar.topType}
          accessoriesType={user.avatar.accessoriesType}
          hairColor={user.avatar.hairColor}
          facialHairType={user.avatar.facialHairType}
          facialHairColor={user.avatar.facialHairColor}
          clotheType={user.avatar.clotheType}
          clotheColor={user.avatar.clotheColor}
          eyebrowType={user.avatar.eyebrowType}
          mouthType={user.avatar.mouthType}
          skinColor={user.avatar.skinColor}
        />
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

        <LinkMenuItem to="/profile" onClick={handleClose}>
          <ListItemIcon className={classes.listIcon}>
            <PersonOutlineOutlinedIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText primary={t('edit profile')} />
        </LinkMenuItem>

        <LinkMenuItem to="/activities" onClick={handleClose}>
          <ListItemIcon className={classes.listIcon}>
            <DirectionsRunOutlinedIcon fontSize="small" color="primary" />
          </ListItemIcon>
          <ListItemText primary={t('edit activities')} />
        </LinkMenuItem>

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
