import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  makeStyles,
  List,
  ListItem,
  Typography,
  Grid,
} from '@material-ui/core';
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
          <List>
            <ListItem>
              <Typography variant="body2">
                {t('activity-description')}
              </Typography>
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
