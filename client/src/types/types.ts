export type EntryType = {
  _id: string;
  user: string;
  mood: number;
  date: Date;
  activities?: string[] | null;
};

export type ActivityType = {
  user: string;
  name: string;
  icon: string;
};

export type StateType = {
  entries: EntryType[] | null;
  activities: ActivityType[] | null;
  dispatch?: React.Dispatch<ActionType>;
};

export enum ActionsNames {
  GET_ENTRIES = 'GET_ENTRIES',
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};

type Payload = {
  [ActionsNames.GET_ENTRIES]: {
    id: number;
  };
};

export type ActionType = ActionMap<Payload>[keyof ActionMap<Payload>];
