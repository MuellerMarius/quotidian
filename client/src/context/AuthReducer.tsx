import {
  AuthStateType,
  AuthActionNames,
  ActionMap,
  AuthPayload,
} from '../types/contexttypes';

const GlobalReducer = (
  state: AuthStateType,
  action: ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>]
) => {
  switch (action.type) {
    case AuthActionNames.SET_LOADING:
      return { ...state, isLoading: action.payload.isLoading };
    case AuthActionNames.LOGIN:
      return {
        ...state,
        user: action.payload.user,
        isAuthenticated: true,
        isLoading: false,
      };
    case AuthActionNames.LOGOUT:
      return {
        ...state,
        user: undefined,
        isAuthenticated: false,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default GlobalReducer;
