import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  makeStyles,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Grid,
  ListSubheader,
} from '@material-ui/core';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { EntryScreenProps } from '../types/proptypes';
import ActivityEditor from '../components/ActivityEditor';

const useStyles = makeStyles({
  marginBottom: {
    marginBottom: 8,
  },
});

const ActivityScreen: React.FC<EntryScreenProps> = ({ status }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <>
      <Typography
        variant="h5"
        component="h5"
        id="activity-header"
        classes={{ root: classes.marginBottom }}
      >
        {t('edit activities')}
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={5} lg={4} xl={3}>
          <List subheader={<ListSubheader>{t('actions')}</ListSubheader>}>
            <ListItem button>
              <ListItemIcon>
                <CreateNewFolderIcon />
              </ListItemIcon>
              <ListItemText primary={t('add new category')} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PlaylistAddIcon />
              </ListItemIcon>
              <ListItemText primary={t('add new activity')} />
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12} sm={7} md={5}>
          <ActivityEditor status={status} />
        </Grid>
      </Grid>
    </>
  );
};

export default ActivityScreen;
