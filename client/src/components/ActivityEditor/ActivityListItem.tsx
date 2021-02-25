import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Icon,
  createStyles,
  makeStyles,
  Theme,
  CircularProgress,
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditableTypography from '../EditableTypography';
import { ActivityListItemProps } from '../../types/proptypes';
import useApi from '../../hooks/useApi';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      marginLeft: theme.spacing(2),
      width: 'auto',
    },
    deleteButton: {
      color: '#b9bcd0',
    },
  })
);

const ActivityListItem: React.FC<ActivityListItemProps> = (props) => {
  const { activity } = props;
  const { t } = useTranslation();
  const { status } = useApi();
  const classes = useStyles();

  const handleIconChange = () => {
    alert(`icon ${activity._id}`);
  };

  const handleNameChange = (value: string) => {
    alert(`activity: ${activity._id}, value: ${value}`);
  };

  const handleDelete = () => {
    alert(`delete activity: ${activity._id}`);
  };

  return (
    <ListItem className={classes.nested}>
      <ListItemIcon>
        <IconButton
          edge="start"
          aria-label={activity.icon}
          onClick={handleIconChange}
          size="small"
        >
          <Icon>{activity.icon}</Icon>
        </IconButton>
      </ListItemIcon>
      <ListItemText
        primary={
          <EditableTypography
            text={activity.name}
            onSubmit={handleNameChange}
          />
        }
      />
      <ListItemSecondaryAction>
        {status === 'loading' && (
          <IconButton disabled>
            <CircularProgress size={16} />
          </IconButton>
        )}
        <IconButton
          aria-label={t('delete')}
          onClick={handleDelete}
          classes={{ root: classes.deleteButton }}
          size="small"
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default ActivityListItem;
