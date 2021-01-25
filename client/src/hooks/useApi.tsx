import { useCallback, useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import { ActionNames, EntryType, StatusType } from '../types/types';

const handleHttpErrors = (response: Response) => {
  if (!response.ok) {
    throw Error(`${response.status}`);
  }
  return response;
};

const useApi = () => {
  const [status, setStatus] = useState<StatusType>('idle');
  const { jwt, dispatch } = useGlobalContext();

  // TODO: Refactor fetch method
  const getEntries = useCallback(() => {
    setStatus('loading');
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/entries`, {
      method: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    })
      .then(handleHttpErrors)
      .then((res) => res.json())
      .then((data) => {
        setStatus('resolved');
        dispatch!({
          type: ActionNames.SET_ENTRIES,
          payload: { entries: data as EntryType[] },
        });
      })
      .catch((err) => {
        setStatus('error');
      });
  }, [dispatch, jwt]);

  const deleteEntry = (entry: EntryType) => {
    setStatus('loading');
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/entries/${entry._id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json, text/plain, */*',
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    })
      .then(handleHttpErrors)
      .then((res) => res.json())
      .then(() => {
        setStatus('resolved');
        dispatch!({
          type: ActionNames.DELETE_ENTRY,
          payload: { entry },
        });
      })
      .catch((err) => {
        setStatus('error');
      });
  };

  return { status, getEntries, deleteEntry };
};

export default useApi;
