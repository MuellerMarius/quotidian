import React, {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';
import AuthReducer from './AuthReducer';
import { UserType } from '../types/types';
import {
  AuthActionNames,
  AuthContextType,
  AuthApiRequestType,
} from '../types/contexttypes';
import handleHttpErrors from '../util/http';

const stub = (): never => {
  throw new Error(
    'Element tries to access a function from AuthContext but is not within AuthContext.Provider'
  );
};

const initialState = {
  isAuthenticated: false,
  isLoading: false,
};

const initialContext = {
  ...initialState,
  dispatch: stub,
  auth: stub,
  login: stub,
  signup: stub,
  logout: stub,
};

const apiFetchOptions: RequestInit = {
  method: 'post',
  credentials: 'include',
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  },
};

const AuthContext = createContext<AuthContextType>(initialContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const setLoading = (isLoading: boolean) => {
    dispatch({ type: AuthActionNames.SET_LOADING, payload: { isLoading } });
  };

  const userApiRequest = (
    action: AuthApiRequestType,
    email?: string,
    password?: string,
    name?: string
  ) =>
    new Promise<UserType>((resolve, reject) => {
      const apiBaseUrl = `${process.env.REACT_APP_SERVER_URL}/api`;
      setLoading(true);

      fetch(`${apiBaseUrl}/user/${action}`, {
        ...apiFetchOptions,
        body: JSON.stringify({ email, password, name }),
      })
        .then((res) => handleHttpErrors(res))
        .then(async (data) => {
          if (action === 'logout') {
            dispatch({
              type: AuthActionNames.LOGOUT,
              payload: {},
            });
          } else {
            dispatch({
              type: AuthActionNames.LOGIN,
              payload: { user: await data.json() },
            });
          }
          resolve((data as unknown) as UserType);
        })
        .catch((err) => reject(err))
        .finally(() => setLoading(false));
    });

  const auth = useCallback(() => userApiRequest('auth'), []);

  const logout = () => userApiRequest('logout');

  const login = (email: string, password: string) =>
    userApiRequest('login', email, password);

  const signup = (name: string, email: string, password: string) =>
    userApiRequest('signup', email, password, name);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        error: state.error,
        user: state.user,
        dispatch,
        login,
        signup,
        auth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'Element tries to access AuthContext but is not within AuthContext.Provider'
    );
  }
  return context;
};
