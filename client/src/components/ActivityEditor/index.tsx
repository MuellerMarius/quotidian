import React from 'react';
import { List, createStyles, makeStyles, Theme } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { ActivityEditorProps } from '../../types/proptypes';
import ActivityListAdd from './ActivityListAdd';
import { useGlobalContext } from '../../context/GlobalContext';
import ActivityListCategory from './ActivityListCategory';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listRoot: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    addNew: {
      backgroundColor: '#F7F9FB',
      '&:hover': {
        backgroundColor: '#F7F9FB',
      },
    },
    dividerRoot: {
      marginTop: 8,
      marginBottom: 8,
    },
    marginBottom: {
      marginBottom: 8,
    },
    deleteButton: {
      color: '#b9bcd0',
    },
  })
);

const ActivityEditor: React.FC<ActivityEditorProps> = (props) => {
  const { status } = props;
  const { activities } = useGlobalContext();
  const classes = useStyles();

  if (status === 'idle' || status === 'loading') {
    return (
      <>
        {Array.from(Array(5).keys()).map((id) => (
          <Skeleton
            key={id}
            variant="rect"
            height={45}
            className={classes.marginBottom}
          />
        ))}
      </>
    );
  }

  return (
    <List>
      {activities.map((cat) => (
        <ActivityListCategory category={cat} key={cat._id} />
      ))}
      <ActivityListAdd type="category" />
    </List>
  );
};

export default ActivityEditor;
