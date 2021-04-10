import {
  SnackBarType,
  EntryType,
  ActivityCatType,
  CommonUserDataType,
  ActivityType,
  UserType,
} from './types';

export type GlobalStateType = {
  selectedDate: Date | null | undefined;
  snackbar: SnackBarType;
  entries: EntryType[] | null | undefined;
  activities: ActivityCatType[];
};

export type GlobalContextType = GlobalStateType & {
  dispatch: React.Dispatch<
    ActionMap<GlobalPayload>[keyof ActionMap<GlobalPayload>]
  >;
};

export enum GlobalActionNames {
  SET_COMMON_USER_DATA,
  SET_ACTIVITIES,
  ADD_ACTIVITY,
  UPDATE_ACTIVITY,
  DELETE_ACTIVITY,
  ADD_ACTIVITY_CATEGORY,
  UPDATE_ACTIVITY_CATEGORY,
  DELETE_ACTIVITY_CATEGORY,
  SET_ENTRIES,
  ADD_ENTRY,
  UPDATE_ENTRY,
  DELETE_ENTRY,
  HIDE_SNACKBAR,
  SHOW_SNACKBAR,
  SELECT_DATE,
}

export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};

export type GlobalPayload = {
  [GlobalActionNames.SET_COMMON_USER_DATA]: {
    data: CommonUserDataType;
  };
  [GlobalActionNames.SET_ACTIVITIES]: {
    activities: ActivityCatType[];
  };
  [GlobalActionNames.ADD_ACTIVITY]: {
    activity: ActivityType;
  };
  [GlobalActionNames.UPDATE_ACTIVITY]: {
    activity: ActivityType;
  };
  [GlobalActionNames.DELETE_ACTIVITY]: {
    activity: ActivityType;
  };
  [GlobalActionNames.ADD_ACTIVITY_CATEGORY]: {
    category: ActivityCatType;
  };
  [GlobalActionNames.UPDATE_ACTIVITY_CATEGORY]: {
    category: ActivityCatType;
  };
  [GlobalActionNames.DELETE_ACTIVITY_CATEGORY]: {
    category: ActivityCatType;
  };
  [GlobalActionNames.SET_ENTRIES]: {
    entries: EntryType[] | null;
  };
  [GlobalActionNames.DELETE_ENTRY]: {
    entry: EntryType;
  };
  [GlobalActionNames.ADD_ENTRY]: {
    entry: EntryType;
  };
  [GlobalActionNames.UPDATE_ENTRY]: {
    entry: EntryType;
  };
  [GlobalActionNames.SELECT_DATE]: {
    date: Date | null;
  };
  [GlobalActionNames.HIDE_SNACKBAR]: {};
  [GlobalActionNames.SHOW_SNACKBAR]: {
    snackbar: SnackBarType;
  };
};

export type AuthStateType = {
  error?: Error;
  isAuthenticated: boolean;
  isLoading: boolean;
  user?: UserType;
};

export type AuthContextType = AuthStateType & {
  auth: () => Promise<UserType>;
  login: (email: string, password: string) => Promise<UserType>;
  signup: (name: string, email: string, password: string) => Promise<UserType>;
  logout: () => Promise<UserType>;
  updateUser: (user: UserType) => Promise<UserType>;
};

export type AuthApiRequestType =
  | 'login'
  | 'logout'
  | 'signup'
  | 'auth'
  | 'update';

export enum AuthActionNames {
  LOGOUT,
  LOGIN,
  SET_LOADING,
}

export type AuthPayload = {
  [AuthActionNames.LOGOUT]: {};
  [AuthActionNames.LOGIN]: {
    user: UserType;
  };
  [AuthActionNames.SET_LOADING]: {
    isLoading: boolean;
  };
};
