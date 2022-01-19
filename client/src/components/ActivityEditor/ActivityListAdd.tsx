/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ListItem, ListItemIcon, ListItemText, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import EditableTypography from '../EditableTypography';
import useApi from '../../hooks/useApi';
import { ActivityListAddProps } from '../../types/proptypes';
import { ActivityCatType, ActivityType } from '../../types/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    scrollableList: {
      height: '100%',
      overflow: 'auto',
    },
    listRootAct: {
      marginLeft: theme.spacing(2),
      width: 'auto',
      color: '#b9bcd0',
    },
    listRootCat: {
      color: '#b9bcd0',
    },
  })
);

const ActivityListAdd: React.FC<ActivityListAddProps> = (props) => {
  const { t } = useTranslation();
  const { dbAdd } = useApi();
  const classes = useStyles();
  const [active, setActive] = useState(false);

  const handleSubmit = (value: string) => {
    let newItem;
    if (props.type === 'activity') {
      newItem = {
        _id: '',
        name: value,
        icon: 'flash_on',
        parentCatId: props.category._id,
      } as ActivityType;
    } else {
      newItem = {
        _id: '',
        name: value,
        activities: [],
      } as ActivityCatType;
    }

    dbAdd(newItem);
    toggleActive();
  };

  const toggleActive = () => {
    setActive((val) => !val);
  };

  if (active) {
    return (
      <ListItem
        classes={{
          root:
            props.type === 'activity'
              ? classes.listRootAct
              : classes.listRootCat,
        }}
      >
        <ListItemIcon>
          {props.type === 'activity' ? <FlashOnIcon /> : <FolderOutlinedIcon />}
        </ListItemIcon>
        <ListItemText
          primary={
            <EditableTypography
              text={props.type === 'activity' ? t('act name') : t('group name')}
              onSubmit={handleSubmit}
              onEscape={toggleActive}
              autoFocus
            />
          }
        />
      </ListItem>
    );
  }

  return (
    <ListItem
      classes={{
        root:
          props.type === 'activity' ? classes.listRootAct : classes.listRootCat,
      }}
      onClick={toggleActive}
      button
    >
      <ListItemIcon>
        {props.type === 'activity' ? (
          <PlaylistAddIcon color="secondary" fontSize="small" />
        ) : (
          <CreateNewFolderIcon color="secondary" fontSize="small" />
        )}
      </ListItemIcon>
      <ListItemText
        color="secondary"
        primary={
          props.type === 'activity'
            ? t('add new activity')
            : t('add new category')
        }
      />
    </ListItem>
  );
};

export default ActivityListAdd;
