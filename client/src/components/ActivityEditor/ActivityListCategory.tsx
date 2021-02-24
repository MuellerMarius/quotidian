import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Collapse,
  List,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import EditableTypography from '../EditableTypography';
import ActivityListItem from './ActivityListItem';
import ActivityListAdd from './ActivityListAdd';
import { ActivityListCategoryProps } from '../../types/proptypes';
import useApi from '../../hooks/useApi';

const useStyles = makeStyles({
  deleteButton: {
    color: '#b9bcd0',
  },
});

const ActivityListCategory: React.FC<ActivityListCategoryProps> = (props) => {
  const { category } = props;
  const { t } = useTranslation();
  const { dbUpdate, status } = useApi();
  const [open, setOpen] = useState(true);
  const classes = useStyles();

  const toggleCollapse = () => {
    setOpen((value) => !value);
  };

  const handleChange = (value: string) => {
    dbUpdate({ ...category, name: value });
  };

  const handleDelete = () => {
    alert(`delete category: ${category._id}`);
  };

  return (
    <>
      <ListItem>
        <ListItemIcon>
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
              edge="start"
              aria-label="expand"
              onClick={toggleCollapse}
              size="small"
            >
              <ExpandMore />
            </IconButton>
          )}
        </ListItemIcon>
        <ListItemText
          primary={
            <EditableTypography text={category.name} onSubmit={handleChange} />
          }
        />
        <ListItemSecondaryAction>
          {status === 'idle' && (
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
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {category.activities.map((act) => (
            <ActivityListItem activity={act} key={act._id} />
          ))}
          <ActivityListAdd type="activity" category={category} />
        </List>
      </Collapse>
    </>
  );
};

export default ActivityListCategory;
