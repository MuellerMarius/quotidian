import { useAuth0 } from '@auth0/auth0-react';
import { useCallback, useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import {
  ActionNames,
  ActivityCatType,
  CommonUserDataType,
  EntryType,
  StatusType,
} from '../types/types';

const handleHttpErrors = (response: Response) => {
  if (!response.ok) {
    throw Error(`${response.status}`);
  }
  return response;
};

const apiFetchOptions = (jwt: string, method: string, body: string | null) => ({
  method,
  headers: {
    Accept: 'application/json, text/plain, */*',
    Authorization: `Bearer ${jwt}`,
    'Content-Type': 'application/json',
  },
  body,
});

const useApi = () => {
  const [status, setStatus] = useState<StatusType>('idle');
  const { dispatch } = useGlobalContext();
  const { getAccessTokenSilently } = useAuth0();
  const apiBaseUrl = `${process.env.REACT_APP_SERVER_URL}/api`;

  const apiFetch = useCallback(
    async (
      url: string,
      method: string,
      body: string | null,
      onSuccess: (data: any) => void,
      onError: (err: any) => void
    ) => {
      setStatus('loading');
      try {
        const jwt = await getAccessTokenSilently();
        const options = apiFetchOptions(jwt, method, body);
        const response = await fetch(url, options);
        handleHttpErrors(response);
        onSuccess(await response.json());
        setStatus('resolved');
      } catch (err) {
        onError(err);
        setStatus('error');
      }
    },
    [getAccessTokenSilently]
  );

  /**
   *   Get common data (activites and entries) from user
   */
  const getCommonUserData = useCallback(() => {
    const onSuccess = (data: CommonUserDataType) => {
      const entries = data.entries.map(
        (e) => ({ ...e, date: new Date(e.date) } as EntryType)
      );
      dispatch!({
        type: ActionNames.SET_COMMON_USER_DATA,
        payload: { data: { entries, activities: data.activities } },
      });
    };

    const onError = (err: any) => {
      dispatch!({
        type: ActionNames.SHOW_SNACKBAR,
        payload: {
          snackbar: { message: 'snackbar.failed-load', severity: 'error' },
        },
      });
    };

    apiFetch(`${apiBaseUrl}/`, 'GET', null, onSuccess, onError);
  }, [apiFetch, dispatch, apiBaseUrl]);

  /**
   *   Get all activities from user
   */
  const getActivities = useCallback(() => {
    const onSuccess = (activities: ActivityCatType[]) => {
      dispatch!({
        type: ActionNames.SET_ACTIVITIES,
        payload: { activities },
      });
    };

    const onError = (err: any) => {
      dispatch!({
        type: ActionNames.SHOW_SNACKBAR,
        payload: {
          snackbar: { message: 'snackbar.failed-load', severity: 'error' },
        },
      });
    };

    apiFetch(`${apiBaseUrl}/activities`, 'GET', null, onSuccess, onError);
  }, [apiFetch, dispatch, apiBaseUrl]);

  /**
   *   Get all entries from user
   */
  const getEntries = useCallback(() => {
    const onSuccess = (data: EntryType[]) => {
      const entries = data.map(
        (e) => ({ ...e, date: new Date(e.date) } as EntryType)
      );
      dispatch!({
        type: ActionNames.SET_ENTRIES,
        payload: { entries },
      });
    };

    const onError = (err: any) => {
      dispatch!({
        type: ActionNames.SHOW_SNACKBAR,
        payload: {
          snackbar: { message: 'snackbar.failed-load', severity: 'error' },
        },
      });
    };

    apiFetch(`${apiBaseUrl}/entries`, 'GET', null, onSuccess, onError);
  }, [apiFetch, dispatch, apiBaseUrl]);

  /**
   *   Post a new entry
   */
  const addEntry = (entry: EntryType) => {
    const onSuccess = (data: EntryType) => {
      dispatch!({
        type: ActionNames.ADD_ENTRY,
        payload: { entry: { ...data, date: new Date(data.date) } },
      });
    };

    const onError = (err: any) => {
      dispatch!({
        type: ActionNames.SHOW_SNACKBAR,
        payload: {
          snackbar: { message: 'snackbar.failed-save', severity: 'error' },
        },
      });
    };

    apiFetch(
      `${apiBaseUrl}/entries`,
      'POST',
      JSON.stringify(entry),
      onSuccess,
      onError
    );
  };

  /**
   *   Update an entry
   */
  const updateEntry = (entry: EntryType) => {
    const onSuccess = (data: EntryType) => {
      dispatch!({
        type: ActionNames.UPDATE_ENTRY,
        payload: { entry: { ...data, date: new Date(data.date) } },
      });
    };

    const onError = (err: any) => {
      dispatch!({
        type: ActionNames.SHOW_SNACKBAR,
        payload: {
          snackbar: { message: 'snackbar.failed-save', severity: 'error' },
        },
      });
    };

    const url = `${apiBaseUrl}/entries/${entry._id}`;
    apiFetch(url, 'PATCH', JSON.stringify(entry), onSuccess, onError);
  };

  /**
   *   Delete entry by id
   */
  const deleteEntry = useCallback(
    (entry: EntryType) => {
      const onSuccess = (data: EntryType) => {
        dispatch!({
          type: ActionNames.DELETE_ENTRY,
          payload: { entry },
        });
      };

      const onError = (err: any) => {
        dispatch!({
          type: ActionNames.SHOW_SNACKBAR,
          payload: {
            snackbar: { message: 'snackbar.failed-delete', severity: 'error' },
          },
        });
      };

      const url = `${apiBaseUrl}/entries/${entry._id}`;
      apiFetch(url, 'DELETE', null, onSuccess, onError);
    },
    [apiBaseUrl, apiFetch, dispatch]
  );

  return {
    status,
    getCommonUserData,
    getActivities,
    getEntries,
    addEntry,
    deleteEntry,
    updateEntry,
  };
};

export default useApi;
