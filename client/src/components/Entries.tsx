import React, { useEffect, useState } from 'react';
import { Button, Card, CircularProgress, List } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import EntryListItem from './EntryListItem';
import { useGlobalContext } from '../context/GlobalContext';
import useApi from '../hooks/useApi';
import { ScreenProps } from '../types/types';
import EntryListItemSkeleton from './EntryListItemSkeleton';

const Entries: React.FC<ScreenProps> = ({ status }) => {
  const { t } = useTranslation();
  const { entries } = useGlobalContext();

  if (status === 'error') {
    return <Card>error</Card>;
  }

  return (
    <Card>
      <List>
        {status === 'loading' || status === 'idle'
          ? Array.from({ length: 5 }, (_, k) => (
              <EntryListItemSkeleton key={k} />
            ))
          : entries?.map((entry) => (
              <EntryListItem entry={entry} key={entry._id} />
            ))}
      </List>
    </Card>
  );
};

export default Entries;
