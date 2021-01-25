import {
  StateType,
  ActionType,
  ActionNames,
  SeverityType,
} from '../types/types';

const GlobalReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case ActionNames.SET_JWT:
      return { ...state, jwt: action.payload.jwt };
    case ActionNames.SET_ENTRIES:
      return { ...state, entries: action.payload.entries };
    case ActionNames.DELETE_ENTRY:
      return {
        ...state,
        entries: state.entries?.filter(
          (entry) => entry._id !== action.payload.entry._id
        ),
        snackbar: {
          message: 'snackbar.deleted',
          severity: 'error' as SeverityType,
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
        snackbar: action.payload.snackbar,
      };
    default:
      return state;
  }
};

export default GlobalReducer;
