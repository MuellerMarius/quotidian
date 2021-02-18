import React from 'react';
import {
  Divider,
  Grid,
  Icon,
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import MoodAvatar from './MoodAvatar';
import { EntryListItemProps } from '../types/proptypes';
import { useGlobalContext } from '../context/GlobalContext';

const useStyles = makeStyles({
  listitemroot: {
    marginTop: 10,
    marginBottom: 10,
  },
  secondary: {
    marginTop: 8,
  },
  iconRoot: {
    marginRight: '5px',
  },
  gridRoot: {
    lineHeight: 1,
  },
});

const SecondaryItem: React.FC<{ comment: string; act: string[] }> = (props) => {
  const { comment, act: selectedActivityIds } = props;
  const { activities } = useGlobalContext();
  const classes = useStyles();
  const selectedActivities = activities
    .map((cat) => [
      ...cat.activities.filter((act) => selectedActivityIds.includes(act._id)),
    ])
    .flat();

  return (
    <Grid container direction="row" alignItems="center" component="span">
      {selectedActivities.map((act) => (
        <Grid
          item
          component="span"
          key={act._id}
          classes={{ root: classes.gridRoot }}
        >
          <Icon
            fontSize="small"
            color="secondary"
            classes={{ root: classes.iconRoot }}
          >
            {act.icon}
          </Icon>
        </Grid>
      ))}
      <Grid item component="span" classes={{ root: classes.gridRoot }}>
        {comment}
      </Grid>
    </Grid>
  );
};

const EntryListItem: React.FC<EntryListItemProps> = ({
  entry,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const { mood, comment, date, activities } = entry;

  return (
    <>
      <Divider variant="middle" component="li" light />
      <ListItem
        button
        alignItems="center"
        onClick={() => onEdit(entry)}
        classes={{ root: classes.listitemroot }}
      >
        <ListItemIcon>
          <MoodAvatar mood={mood} />
        </ListItemIcon>

        <ListItemText
          primary={t('datekey', { date: new Date(date) })}
          secondary={<SecondaryItem comment={comment} act={activities} />}
          classes={{ secondary: classes.secondary }}
        />
        <ListItemSecondaryAction>
          <IconButton aria-label={t('delete')} onClick={() => onDelete(entry)}>
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
};

export default React.memo(EntryListItem);
