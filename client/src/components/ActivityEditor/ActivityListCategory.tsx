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
  CircularProgress,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
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
  const { category, setDialog } = props;
  const { t } = useTranslation();
  const { dbUpdate, dbDelete, status } = useApi();
  const [open, setOpen] = useState(true);
  const classes = useStyles();

  const toggleCollapse = () => {
    setOpen((value) => !value);
  };

  const handleChange = (value: string) => {
    dbUpdate({ ...category, name: value });
  };

  const handleDelete = () => {
    setDialog({
      open: true,
      title: 'confirm-delete-category.title',
      content: 'confirm-delete-category.description',
      onCancel: () => null,
      onConfirm: () => dbDelete(category),
    });
  };

  return <>
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
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {category.activities.map((act) => (
          <ActivityListItem
            activity={{ ...act, parentCatId: category._id }}
            key={act._id}
            setDialog={setDialog}
          />
        ))}
        <ActivityListAdd type="activity" category={category} />
      </List>
    </Collapse>
  </>;
};

export default ActivityListCategory;
