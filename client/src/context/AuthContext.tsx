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
  auth: stub,
  login: stub,
  signup: stub,
  logout: stub,
  updateUser: stub,
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
  const apiBaseUrl = `${process.env.REACT_APP_SERVER_URL}/api`;
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const setLoading = (isLoading: boolean) => {
    dispatch({ type: AuthActionNames.SET_LOADING, payload: { isLoading } });
  };

  const userApiRequest = useCallback(
    (
      action: AuthApiRequestType,
      email?: string,
      password?: string,
      name?: string,
      user?: UserType
    ) =>
      new Promise<UserType>((resolve, reject) => {
        setLoading(true);

        fetch(`${apiBaseUrl}/user/${action}`, {
          ...apiFetchOptions,
          body: JSON.stringify({ email, password, name, user }),
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
      }),
    [apiBaseUrl]
  );

  const auth = useCallback(() => userApiRequest('auth'), [userApiRequest]);

  const logout = () => userApiRequest('logout');

  const login = (email: string, password: string) =>
    userApiRequest('login', email, password);

  const signup = (name: string, email: string, password: string) =>
    userApiRequest('signup', email, password, name);

  const updateUser = (user: UserType) =>
    userApiRequest('update', undefined, undefined, undefined, user);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
        error: state.error,
        user: state.user,
        login,
        signup,
        auth,
        logout,
        updateUser,
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
