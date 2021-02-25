import { useAuth0 } from '@auth0/auth0-react';
import { useCallback, useState } from 'react';
import { useGlobalContext } from '../context/GlobalContext';
import {
  ActionNames,
  ActivityCatType,
  ActivityType,
  CommonUserDataType,
  EntryType,
  StatusType,
} from '../types/types';
import {
  isActivityCatType,
  isActivityType,
  isEntryType,
} from '../util/typescript';

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

  const showSnackbarError = useCallback(
    (msg: string) => {
      dispatch!({
        type: ActionNames.SHOW_SNACKBAR,
        payload: {
          snackbar: { message: msg, severity: 'error' },
        },
      });
    },
    [dispatch]
  );

  /**
   *   Get common data (activites and entries) from user
   */
  const getCommonUserData = useCallback(() => {
    const onError = () => showSnackbarError('snackbar.failed-load');
    const onSuccess = (data: CommonUserDataType) => {
      const entries = data.entries.map(
        (e) => ({ ...e, date: new Date(e.date) } as EntryType)
      );
      dispatch!({
        type: ActionNames.SET_COMMON_USER_DATA,
        payload: { data: { entries, activities: data.activities } },
      });
    };

    apiFetch(`${apiBaseUrl}/`, 'GET', null, onSuccess, onError);
  }, [apiFetch, dispatch, apiBaseUrl, showSnackbarError]);

  /**
   *   Add a new element to the database
   */
  const dbAdd = (item: EntryType | ActivityCatType | ActivityType) => {
    if (isEntryType(item)) {
      addEntry(item as EntryType);
    } else if (isActivityCatType(item)) {
      addActCategory(item as ActivityCatType);
    } else if (isActivityType(item)) {
      addActivity(item as ActivityType);
    }
  };

  /**
   *   Delete an element from the database
   */
  const dbDelete = (item: EntryType | ActivityCatType | ActivityType) => {
    if (isEntryType(item)) {
      deleteEntry(item as EntryType);
    } else if (isActivityCatType(item)) {
      deleteCategory(item as ActivityCatType);
    } else if (isActivityType(item)) {
      // addActivity(item as ActivityType);
    }
  };

  /**
   *   Update an element from the database
   */
  const dbUpdate = (item: EntryType | ActivityCatType | ActivityType) => {
    if (isEntryType(item)) {
      updateEntry(item as EntryType);
    } else if (isActivityCatType(item)) {
      updateActCategory(item as ActivityCatType);
    } else if (isActivityType(item)) {
      // addActivity(item as ActivityType);
    }
  };

  /**
   ******* ActivityCategories *******************************************
   */

  const addActCategory = (cat: ActivityCatType) => {
    const onError = () => showSnackbarError('snackbar.cat-failed-save');
    const onSuccess = (category: ActivityCatType) => {
      dispatch!({
        type: ActionNames.ADD_ACTIVITY_CATEGORY,
        payload: { category },
      });
    };

    apiFetch(
      `${apiBaseUrl}/activities/category`,
      'POST',
      JSON.stringify(cat),
      onSuccess,
      onError
    );
  };

  const updateActCategory = (cat: ActivityCatType) => {
    const onError = () => showSnackbarError('snackbar.cat-failed-save');
    const onSuccess = (category: ActivityCatType) => {
      dispatch!({
        type: ActionNames.UPDATE_ACTIVITY_CATEGORY,
        payload: { category },
      });
    };

    apiFetch(
      `${apiBaseUrl}/activities/category`,
      'PATCH',
      JSON.stringify(cat),
      onSuccess,
      onError
    );
  };

  const deleteCategory = (cat: ActivityCatType) => {
    const onError = () => showSnackbarError('snackbar.cat-failed-delete');
    const onSuccess = (category: ActivityCatType) => {
      dispatch!({
        type: ActionNames.DELETE_ACTIVITY_CATEGORY,
        payload: { category },
      });
    };

    apiFetch(
      `${apiBaseUrl}/activities/category`,
      'DELETE',
      JSON.stringify(cat),
      onSuccess,
      onError
    );
  };

  /**
   ******* Activities **************************************************
   */

  const getActivities = useCallback(() => {
    const onError = () => showSnackbarError('snackbar.failed-load');
    const onSuccess = (activities: ActivityCatType[]) => {
      dispatch!({
        type: ActionNames.SET_ACTIVITIES,
        payload: { activities },
      });
    };

    apiFetch(`${apiBaseUrl}/activities`, 'GET', null, onSuccess, onError);
  }, [apiFetch, dispatch, apiBaseUrl, showSnackbarError]);

  const addActivity = (act: ActivityType) => {
    const onError = (err: any) => showSnackbarError('snackbar.act-failed-save');
    const onSuccess = (activity: ActivityType) => {
      dispatch!({
        type: ActionNames.ADD_ACTIVITY,
        payload: { activity: { ...activity, parentCatId: act.parentCatId } },
      });
    };

    apiFetch(
      `${apiBaseUrl}/activities/`,
      'POST',
      JSON.stringify(act),
      onSuccess,
      onError
    );
  };

  /**
   ******* Entries *****************************************************
   */

  const addEntry = (entry: EntryType) => {
    const onError = () => showSnackbarError('snackbar.failed-save');
    const onSuccess = (data: EntryType) => {
      dispatch!({
        type: ActionNames.ADD_ENTRY,
        payload: { entry: { ...data, date: new Date(data.date) } },
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

  const updateEntry = (entry: EntryType) => {
    const onError = () => showSnackbarError('snackbar.failed-save');
    const onSuccess = (data: EntryType) => {
      dispatch!({
        type: ActionNames.UPDATE_ENTRY,
        payload: { entry: { ...data, date: new Date(data.date) } },
      });
    };

    const url = `${apiBaseUrl}/entries/${entry._id}`;
    apiFetch(url, 'PATCH', JSON.stringify(entry), onSuccess, onError);
  };

  const deleteEntry = (entry: EntryType) => {
    const onError = () => showSnackbarError('snackbar.failed-delete');
    const onSuccess = (data: EntryType) => {
      dispatch!({
        type: ActionNames.DELETE_ENTRY,
        payload: { entry: data },
      });
    };

    const url = `${apiBaseUrl}/entries/${entry._id}`;
    apiFetch(url, 'DELETE', null, onSuccess, onError);
  };

  return {
    status,
    getCommonUserData,
    dbAdd,
    dbDelete,
    dbUpdate,
  };
};

export default useApi;
