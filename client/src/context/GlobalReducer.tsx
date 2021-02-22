import {
  StateType,
  ActionType,
  ActionNames,
  SeverityType,
  EntryType,
} from '../types/types';

const GlobalReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case ActionNames.SELECT_DATE:
      return { ...state, selectedDate: action.payload.date };
    case ActionNames.SET_COMMON_USER_DATA:
      return { ...state, ...action.payload.data };
    case ActionNames.SET_ACTIVITIES:
      return { ...state, activities: action.payload.activities };
    case ActionNames.ADD_ACTIVITY_CATEGORY:
      return {
        ...state,
        activities: [...state.activities, action.payload.category],
        snackbar: {
          message: 'snackbar.catAdded',
          severity: 'success' as SeverityType,
          open: true,
        },
      };
    case ActionNames.ADD_ACTIVITY:
      return {
        ...state,
        activities: state.activities.map((cat) =>
          cat._id === action.payload.activity.parentCatId
            ? {
                ...cat,
                activities: [...cat.activities, action.payload.activity],
              }
            : cat
        ),
        snackbar: {
          message: 'snackbar.actAdded',
          severity: 'success' as SeverityType,
          open: true,
        },
      };
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
