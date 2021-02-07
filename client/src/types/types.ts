export type EntryType = {
  _id?: string;
  __v?: number | null;
  user?: string;
  mood: number;
  date: Date;
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
  open?: boolean;
  autoHideDuration?: number;
};

export type StatusType = 'idle' | 'loading' | 'resolved' | 'error';

export type StateType = {
  selectedDate: Date | null | undefined;
  snackbar: SnackBarType;
  entries: EntryType[] | null | undefined;
  activities: ActivityType[] | undefined;
  dispatch?: React.Dispatch<ActionType>;
};

export enum ActionNames {
  SET_ENTRIES,
  ADD_ENTRY,
  UPDATE_ENTRY,
  DELETE_ENTRY,
  HIDE_SNACKBAR,
  SHOW_SNACKBAR,
  SELECT_DATE,
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};

type Payload = {
  [ActionNames.SET_ENTRIES]: {
    entries: EntryType[] | null;
  };
  [ActionNames.DELETE_ENTRY]: {
    entry: EntryType;
  };
  [ActionNames.ADD_ENTRY]: {
    entry: EntryType;
  };
  [ActionNames.UPDATE_ENTRY]: {
    entry: EntryType;
  };
  [ActionNames.SELECT_DATE]: {
    date: Date | null;
  };
  [ActionNames.HIDE_SNACKBAR]: {};
  [ActionNames.SHOW_SNACKBAR]: {
    snackbar: SnackBarType;
  };
};

export type ActionType = ActionMap<Payload>[keyof ActionMap<Payload>];

export type DialogState = {
  open: boolean;
  title: string;
  content: string;
  onConfirm?: (...args: any[]) => void | null | undefined;
  onCancel?: (...args: any[]) => void | null | undefined;
};
