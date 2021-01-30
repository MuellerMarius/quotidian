import {
  StateType,
  ActionType,
  ActionNames,
  SeverityType,
  EntryType,
} from '../types/types';

const GlobalReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case ActionNames.SET_JWT:
      return { ...state, jwt: action.payload.jwt };
    case ActionNames.SET_ENTRIES:
      return { ...state, entries: action.payload.entries };
    case ActionNames.ADD_ENTRY:
      return {
        ...state,
        entries: [action.payload.entry, ...(state.entries as EntryType[])],
        snackbar: {
          message: 'snackbar.added',
          severity: 'success' as SeverityType,
          open: true,
        },
      };
    case ActionNames.UPDATE_ENTRY:
      return {
        ...state,
        entries: state.entries?.map((entry) =>
          entry._id === action.payload.entry._id ? action.payload.entry : entry
        ),
        snackbar: {
          message: 'snackbar.updated',
          severity: 'success' as SeverityType,
          open: true,
        },
      };
    case ActionNames.DELETE_ENTRY:
      return {
        ...state,
        entries: state.entries?.filter(
          (entry) => entry._id !== action.payload.entry._id
        ),
        snackbar: {
          message: 'snackbar.deleted',
          severity: 'success' as SeverityType,
          open: true,
        },
      };
    case ActionNames.HIDE_SNACKBAR:
      return {
        ...state,
        snackbar: { ...state.snackbar, open: false },
      };

    case ActionNames.SHOW_SNACKBAR:
      return {
        ...state,
        snackbar: { open: true, ...action.payload.snackbar },
      };
    default:
      return state;
  }
};

export default GlobalReducer;
