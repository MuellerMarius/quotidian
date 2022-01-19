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
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useTranslation } from 'react-i18next';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import MoodAvatar from '../MoodAvatar';
import { EntryListItemProps } from '../../types/proptypes';
import { useGlobalContext } from '../../context/GlobalContext';

const useStyles = makeStyles({
  listitemroot: {
    marginTop: 10,
    marginBottom: 10,
  },
  secondary: {
    marginTop: 8,
  },
  iconRoot: {
    fontSize: 16,
    marginRight: '5px',
  },
  gridRoot: {
    lineHeight: 1,
  },
  deleteButton: {
    color: '#b9bcd0',
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
          <Icon color="secondary" classes={{ root: classes.iconRoot }}>
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
          secondary={
            comment || activities.length > 0 ? (
              <SecondaryItem comment={comment} act={activities} />
            ) : null
          }
          classes={{ secondary: classes.secondary }}
        />
        <ListItemSecondaryAction>
          <IconButton
            aria-label={t('delete')}
            onClick={() => onDelete(entry)}
            size="large"
          >
            <DeleteOutlineIcon
              fontSize="small"
              classes={{ root: classes.deleteButton }}
            />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
};

export default React.memo(EntryListItem);
