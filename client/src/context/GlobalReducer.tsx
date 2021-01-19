import { StateType, ActionType, ActionsNames } from '../types/types';

const GlobalReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case ActionsNames.GET_ENTRIES:
      // TODO: create actions
      return state;

    default:
      return state;
  }
};

export default GlobalReducer;
