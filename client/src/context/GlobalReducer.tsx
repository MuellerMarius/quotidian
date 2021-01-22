import { StateType, ActionType, ActionNames } from '../types/types';

const GlobalReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case ActionNames.SET_JWT:
      return { ...state, jwt: action.payload.jwt };
    case ActionNames.SET_ENTRIES:
      return { ...state, entries: action.payload.entries };
    default:
      return state;
  }
};

export default GlobalReducer;
