import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  makeStyles,
  List,
  ListItem,
  Button,
  Collapse,
  IconButton,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { useAuth } from '../../context/AuthContext';
import {
  topTypes,
  accessoriesTypes,
  hairColors,
  hatColors,
  facialHairTypes,
  facialHairColors,
  clotheTypes,
  clotheColors,
  eyebrowTypes,
  mouthTypes,
  skinColors,
} from './options';
import { AvatarEditorProps } from '../../types/proptypes';
import { useGlobalContext } from '../../context/GlobalContext';
import { GlobalActionNames } from '../../types/contexttypes';

const useStyles = makeStyles({
  collapseRoot: {
    minWidth: 225,
    maxWidth: 275,
  },
  listRoot: {
    alignItems: 'flex-start',
  },
  listItemRoot: {
    padding: 0,
  },
  listItemTextRoot: {
    margin: 0,
  },
  listItemIconRoot: {
    marginTop: -2,
  },
  buttonRight: {
    marginLeft: 'auto',
  },
});

const AvatarEditor: React.FC<AvatarEditorProps> = ({ user, setAvatar }) => {
  const { updateUser } = useAuth();
  const { dispatch } = useGlobalContext();
  const { t } = useTranslation();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const toggleCollapse = () => {
    setOpen((value) => !value);
  };

  const avatarOptions: {
    key: keyof typeof user.avatar;
    options: string[];
  }[] = [
    { key: 'topType', options: topTypes },
    { key: 'accessoriesType', options: accessoriesTypes },
    { key: 'hairColor', options: hairColors },
    { key: 'hatColor', options: hatColors },
    { key: 'facialHairType', options: facialHairTypes },
    { key: 'facialHairColor', options: facialHairColors },
    { key: 'eyebrowType', options: eyebrowTypes },
    { key: 'mouthType', options: mouthTypes },
    { key: 'skinColor', options: skinColors },
    { key: 'clotheType', options: clotheTypes },
    { key: 'clotheColor', options: clotheColors },
  ];

  if (!user) {
    // AvatarEditor only placed within UserProfileScreen
    // UserProfileScreen gives adequate error message
    return null;
  }

  return (
    <List disablePadding classes={{ root: classes.listRoot }}>
      <ListItem classes={{ root: classes.listItemRoot }}>
        <ListItemText
          primary={t('user.change avatar')}
          classes={{ root: classes.listItemTextRoot }}
        />
        <ListItemIcon classes={{ root: classes.listItemIconRoot }}>
          {open ? (
            <IconButton
              edge="start"
              aria-label="collapse"
              onClick={toggleCollapse}
              size="small"
            >
              <ExpandLess />
            </IconButton>
          ) : (
            <IconButton
              edge="end"
              aria-label="expand"
              onClick={toggleCollapse}
              size="small"
            >
              <ExpandMore />
            </IconButton>
          )}
        </ListItemIcon>
      </ListItem>
      <Collapse
        in={open}
        className={classes.collapseRoot}
        timeout="auto"
        unmountOnExit
      >
        <List>
          {avatarOptions.map(
            (option: { key: keyof typeof user.avatar; options: string[] }) => (
              <ListItem disableGutters>
                <FormControl variant="standard" size="small" fullWidth>
                  <InputLabel id="view-select-label">
                    {t(`avatar.${option.key}`)}
                  </InputLabel>
                  <Select
                    labelId="view-select-label"
                    id="view-select"
                    label={t(`user.avatar.${option.key}`)}
                    value={user.avatar[option.key]}
                    onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
                      setAvatar(option.key, e.target.value as string)
                    }
                  >
                    {option.options.map((v) => (
                      <MenuItem value={v}>{v}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </ListItem>
            )
          )}
          <ListItem disableGutters>
            <Button
              classes={{ root: classes.buttonRight }}
              onClick={() => {
                toggleCollapse();
                updateUser({ ...user })
                  .then(() =>
                    dispatch({
                      type: GlobalActionNames.SHOW_SNACKBAR,
                      payload: {
                        snackbar: {
                          message: 'snackbar.user-updated',
                          severity: 'success',
                        },
                      },
                    })
                  )
                  .catch((err) =>
                    dispatch({
                      type: GlobalActionNames.SHOW_SNACKBAR,
                      payload: {
                        snackbar: {
                          message: 'snackbar.user-updated-failed',
                          severity: 'error',
                        },
                      },
                    })
                  );
              }}
            >
              {t('save')}
            </Button>
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
};

export default AvatarEditor;
