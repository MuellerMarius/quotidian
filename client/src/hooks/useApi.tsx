import { useState } from 'react';
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

  const headers = {
    Accept: 'application/json, text/plain, */*',
    Authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json',
  };

  const getEntries = () => {
    setStatus('loading');
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/entries`, {
      method: 'GET',
      headers,
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
  };

  return { status, getEntries };
};

export default useApi;
