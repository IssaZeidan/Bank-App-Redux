import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

// Action Types
const ADD_ACCOUNT = 'ADD_ACCOUNT';
const EDIT_ACCOUNT = 'EDIT_ACCOUNT';
const DELETE_ACCOUNT = 'DELETE_ACCOUNT';
const SET_ACCOUNTS = 'SET_ACCOUNTS';

// Action Creators
export const addAccount = (account) => {
  return {
    type: ADD_ACCOUNT,
    payload: account,
  };
};

export const editAccount = (account) => {
  return {
    type: EDIT_ACCOUNT,
    payload: account,
  };
};

export const deleteAccount = (accountId) => {
  return {
    type: DELETE_ACCOUNT,
    payload: accountId,
  };
};

export const setAccounts = (accounts) => {
  return {
    type: SET_ACCOUNTS,
    payload: accounts,
  };
};

// Async Action Creators
export const addAccountAsync = (account) => {
  return (dispatch) => {
    // Simulating API call delay
    setTimeout(() => {
      dispatch(addAccount(account));
    }, 1000);
  };
};

export const deleteAccountAsync = (accountId) => {
  return (dispatch) => {
    // Simulating API call delay
    setTimeout(() => {
      dispatch(deleteAccount(accountId));
    }, 1000);
  };
};

// Initial State
const initialState = {
  accounts: [],
  numberOfAccounts: 0,
};

// Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ACCOUNT:
      return {
        ...state,
        accounts: [...state.accounts, action.payload],
        numberOfAccounts: state.numberOfAccounts + 1,
      };
    case EDIT_ACCOUNT:
      const updatedAccounts = state.accounts.map((account) =>
        account.id === action.payload.id ? action.payload : account
      );
      return {
        ...state,
        accounts: updatedAccounts,
      };
    case DELETE_ACCOUNT:
      const filteredAccounts = state.accounts.filter(
        (account) => account.id !== action.payload
      );
      return {
        ...state,
        accounts: filteredAccounts,
        numberOfAccounts: state.numberOfAccounts - 1,
      };
    case SET_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload,
        numberOfAccounts: action.payload.length,
      };
    default:
      return state;
  }
};

// Store
const store = createStore(reducer, applyMiddleware(thunk));

export default store;
