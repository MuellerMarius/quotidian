import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Icon,
  Theme,
  CircularProgress,
  Popover,
} from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditableTypography from '../EditableTypography';
import { ActivityListItemProps } from '../../types/proptypes';
import useApi from '../../hooks/useApi';
import IconPicker from './IconPicker';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    nested: {
      marginLeft: theme.spacing(2),
      width: 'auto',
    },
    deleteButton: {
      color: '#b9bcd0',
    },
    popover: {
      overflow: 'visible',
      marginTop: 10,
      '&:before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderBottom: '10px solid #fff',
        left: 'calc(50% - 10px)',
        top: '-10px',
      },
    },
  })
);

const ActivityListItem: React.FC<ActivityListItemProps> = (props) => {
  const { activity, setDialog } = props;
  const { t } = useTranslation();
  const { status, dbUpdate, dbDelete } = useApi();
  const [iconRef, setIconRef] = React.useState<HTMLButtonElement | null>(null);
  const classes = useStyles();

  const openIconPicker = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIconRef(event.currentTarget);
  };

  const handleIconChange = (icon: string) => {
    setIconRef(null);
    dbUpdate({ ...activity, icon });
  };

  const handleNameChange = (name: string) => {
    dbUpdate({ ...activity, name });
  };

  const handleDelete = () => {
    setDialog({
      open: true,
      title: 'confirm-delete-activity.title',
      content: 'confirm-delete-activity.description',
      onCancel: () => null,
      onConfirm: () => dbDelete(activity),
    });
  };

  return (
    <ListItem className={classes.nested}>
      <ListItemIcon>
        <IconButton
          edge="start"
          aria-label={activity.icon}
          onClick={openIconPicker}
          size="small"
        >
          <Icon>{activity.icon}</Icon>
        </IconButton>
        <Popover
          id={`${activity.name}-icon-picker`}
          open={Boolean(iconRef)}
          anchorEl={iconRef}
          onClose={() => setIconRef(null)}
          classes={{ paper: classes.popover }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <IconPicker onChange={handleIconChange} />
        </Popover>
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
          <IconButton disabled size="large">
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
