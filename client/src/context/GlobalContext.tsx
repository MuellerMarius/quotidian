import React, { createContext, useContext, useReducer } from 'react';
import GlobalReducer from './GlobalReducer';
import { StateType } from '../types/types';

const initialState = {
  selectedDate: undefined,
  snackbar: { message: '', severity: undefined, open: false },
  entries: undefined,
  activities: [],
};

const GlobalContext = createContext<StateType>(initialState);

export const GlobalProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalReducer, initialState);

  return (
    <GlobalContext.Provider
      value={{
        selectedDate: state.selectedDate,
        snackbar: state.snackbar,
        entries: state.entries,
        activities: state.activities,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      'Element tries to access GlobalContext but is not within GlobalContext.Provider'
    );
  }
  return context;
};
