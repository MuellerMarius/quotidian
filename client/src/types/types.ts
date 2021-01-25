export type EntryType = {
  _id: string;
  __v?: number | null;
  user: string;
  mood: number;
  date: string;
  activities?: string[] | null;
  comment: string;
};

export type ActivityType = {
  user: string;
  name: string;
  icon: string;
};

export type SeverityType = 'error' | 'success' | 'info' | 'warning';

export type SnackBarType = {
  message: string;
  severity: SeverityType | undefined;
  open: boolean;
  autoHideDuration?: number;
};

export type StatusType = 'idle' | 'loading' | 'resolved' | 'error';

export type StateType = {
  snackbar: SnackBarType;
  jwt: string | undefined | null;
  entries: EntryType[] | undefined | null;
  activities: ActivityType[] | undefined;
  dispatch?: React.Dispatch<ActionType>;
};

export enum ActionNames {
  SET_JWT,
  SET_ENTRIES,
  DELETE_ENTRY,
  HIDE_SNACKBAR,
  SHOW_SNACKBAR,
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};

type Payload = {
  [ActionNames.SET_JWT]: {
    jwt: string;
  };
  [ActionNames.SET_ENTRIES]: {
    entries: EntryType[] | null;
  };
  [ActionNames.DELETE_ENTRY]: {
    entry: EntryType;
  };
  [ActionNames.HIDE_SNACKBAR]: {};
  [ActionNames.SHOW_SNACKBAR]: {
    snackbar: SnackBarType;
  };
};

export type ActionType = ActionMap<Payload>[keyof ActionMap<Payload>];

export type MoodAvatarProps = { mood: number };
export type EntryListItemProps = { entry: EntryType };
export type ScreenProps = { status: StatusType };
