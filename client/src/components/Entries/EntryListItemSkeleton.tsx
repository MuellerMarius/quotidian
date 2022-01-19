import { Divider, ListItem, ListItemText, Typography } from '@mui/material';
import { Skeleton } from '@mui/material';
import React from 'react';

const EntryListItemSkeleton = () => (
  <>
    <Divider variant="inset" component="li" />
    <ListItem alignItems="center">
      <Skeleton
        variant="circular"
        width={36}
        height={36}
        style={{ marginRight: 20 }}
      />
      <ListItemText
        primary={
          <Typography component="div" variant="body1">
            <Skeleton variant="text" style={{ width: '30%' }} />
          </Typography>
        }
        secondary={
          <Typography component="div" variant="body2">
            <Skeleton variant="text" style={{ width: '70%' }} />
          </Typography>
        }
      />
    </ListItem>
  </>
);

export default EntryListItemSkeleton;
