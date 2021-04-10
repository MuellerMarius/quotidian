import { SeverityType, EntryType } from '../types/types';
import {
  GlobalStateType,
  ActionMap,
  GlobalPayload,
  GlobalActionNames,
} from '../types/contexttypes';

const GlobalReducer = (
  state: GlobalStateType,
  action: ActionMap<GlobalPayload>[keyof ActionMap<GlobalPayload>]
) => {
  switch (action.type) {
    case GlobalActionNames.SELECT_DATE:
      return { ...state, selectedDate: action.payload.date };
    case GlobalActionNames.SET_COMMON_USER_DATA:
      return { ...state, ...action.payload.data };
    case GlobalActionNames.SET_ACTIVITIES:
      return { ...state, activities: action.payload.activities };
    case GlobalActionNames.UPDATE_ACTIVITY:
      return {
        ...state,
        activities: state.activities.map((cat) =>
          cat._id === action.payload.activity.parentCatId
            ? {
                ...cat,
                activities: cat.activities.map((act) =>
                  act._id === action.payload.activity._id
                    ? action.payload.activity
                    : act
                ),
              }
            : cat
        ),
        snackbar: {
          message: 'snackbar.act-updated',
          severity: 'success' as SeverityType,
          open: true,
        },
      };
    case GlobalActionNames.DELETE_ACTIVITY:
      return {
        ...state,
        activities: state.activities.map((cat) =>
          cat._id === action.payload.activity.parentCatId
            ? {
                ...cat,
                activities: cat.activities.filter(
                  (act) => act._id !== action.payload.activity._id
                ),
              }
            : cat
        ),
        snackbar: {
          message: 'snackbar.act-deleted',
          severity: 'success' as SeverityType,
          open: true,
        },
      };
    case GlobalActionNames.ADD_ACTIVITY_CATEGORY:
      return {
        ...state,
        activities: [...state.activities, action.payload.category],
        snackbar: {
          message: 'snackbar.cat-added',
          severity: 'success' as SeverityType,
          open: true,
        },
      };
    case GlobalActionNames.UPDATE_ACTIVITY_CATEGORY:
      return {
        ...state,
        activities: state.activities.map((cat) =>
          cat._id === action.payload.category._id
            ? { ...cat, name: action.payload.category.name }
            : cat
        ),
        snackbar: {
          message: 'snackbar.cat-updated',
          severity: 'success' as SeverityType,
          open: true,
        },
      };
    case GlobalActionNames.DELETE_ACTIVITY_CATEGORY:
      return {
        ...state,
        activities: state.activities.filter(
          (cat) => cat._id !== action.payload.category._id
        ),
        snackbar: {
          message: 'snackbar.cat-deleted',
          severity: 'success' as SeverityType,
          open: true,
        },
      };
    case GlobalActionNames.ADD_ACTIVITY:
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
          message: 'snackbar.act-added',
          severity: 'success' as SeverityType,
          open: true,
        },
      };
    case GlobalActionNames.SET_ENTRIES:
      return { ...state, entries: action.payload.entries };
    case GlobalActionNames.ADD_ENTRY:
      return {
        ...state,
        entries: [action.payload.entry, ...(state.entries as EntryType[])],
        snackbar: {
          message: 'snackbar.added',
          severity: 'success' as SeverityType,
          open: true,
        },
      };
    case GlobalActionNames.UPDATE_ENTRY:
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
    case GlobalActionNames.DELETE_ENTRY:
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
    case GlobalActionNames.HIDE_SNACKBAR:
      return {
        ...state,
        snackbar: { ...state.snackbar, open: false },
      };

    case GlobalActionNames.SHOW_SNACKBAR:
      return {
        ...state,
        snackbar: { open: true, ...action.payload.snackbar },
      };
    default:
      return state;
  }
};

export default GlobalReducer;
