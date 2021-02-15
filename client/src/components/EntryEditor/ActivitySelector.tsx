import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Divider,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next/';
import { useGlobalContext } from '../../context/GlobalContext';
import { ActivitySelectorProps } from '../../types/proptypes';
import { ActivityCatType } from '../../types/types';

const useStyles = makeStyles({
  chipRoot: {
    marginRight: 7,
    marginBottom: 5,
  },
  dividerRoot: {
    marginTop: 8,
    marginBottom: 5,
  },
});

const ActivitySelector: React.FC<ActivitySelectorProps> = (props) => {
  const { active, onChange } = props;
  const { t } = useTranslation();
  const { activities } = useGlobalContext();
  const classes = useStyles();

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle1" component="h5">
          {t('activities')}
        </Typography>

        {activities?.map((category: ActivityCatType) => (
          <div key={category._id}>
            <Typography variant="subtitle2" component="h5" color="secondary">
              {category.name}
            </Typography>
            {category.activities?.map((activity) => (
              <Chip
                color={active.includes(activity._id) ? 'primary' : 'secondary'}
                variant={active.includes(activity._id) ? 'default' : 'outlined'}
                avatar={<Avatar>F</Avatar>}
                label={activity.name}
                classes={{ root: classes.chipRoot }}
                onClick={() => onChange(activity._id)}
                clickable
              />
            ))}
            <Divider classes={{ root: classes.dividerRoot }} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ActivitySelector;
