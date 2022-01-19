import React from 'react';
import { Chip, Icon, Typography } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { useGlobalContext } from '../../context/GlobalContext';
import { ActivitySelectorProps } from '../../types/proptypes';
import { ActivityCatType } from '../../types/types';

const useStyles = makeStyles({
  chipRoot: {
    marginRight: 7,
    marginBottom: 5,
  },
  chipFilled: {
    marginRight: 8,
  },
  categoryContainer: {
    marginTop: 5,
    marginBottom: 8,
  },
  caption: {
    fontSize: '0.8rem',
    marginBottom: 5,
  },
});

const ActivitySelector: React.FC<ActivitySelectorProps> = (props) => {
  const { active, onChange } = props;
  const { activities } = useGlobalContext();
  const classes = useStyles();

  const noActivitiesExist = () => {
    if (!activities) {
      return true;
    }

    let result = true;
    activities.forEach((category) => {
      if (category.activities.length > 0) {
        result = false;
      }
    });
    return result;
  };

  if (noActivitiesExist()) {
    return null;
  }

  return (
    <>
      {activities.map((category: ActivityCatType) =>
        category.activities.length > 0 ? (
          <div key={category._id} className={classes.categoryContainer}>
            <Typography
              variant="body1"
              component="h5"
              className={classes.caption}
            >
              {category.name}
            </Typography>
            {category.activities?.map((activity) => (
              <Chip
                color={active.includes(activity._id) ? 'primary' : 'secondary'}
                variant={active.includes(activity._id) ? 'filled' : 'outlined'}
                icon={<Icon>{activity.icon}</Icon>}
                label={activity.name}
                classes={{ root: classes.chipRoot, filled: classes.chipFilled }}
                onClick={() => onChange(activity._id)}
                key={activity._id}
                clickable
              />
            ))}
          </div>
        ) : null
      )}
    </>
  );
};

export default ActivitySelector;
