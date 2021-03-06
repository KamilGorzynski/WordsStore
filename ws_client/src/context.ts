import {createContext} from 'react';

type State = {
  token: String,
  userName: String,
 }

export const initialState: State = {
  token: '',
  userName: '',
  };

type Action = { type: string; payload: string }
  
export const ACTIONS = {
    SET_TOKEN: 'SET_TOKEN',
    SET_USER_NAME: 'SET_USER_NAME',
  };
  
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ACTIONS.SET_TOKEN:
      return {...state, token: action.payload };

    case ACTIONS.SET_USER_NAME:
      return {...state, userName: action.payload };

    default:
      return state;
  }
};

export const StoreContext = createContext<any>('');