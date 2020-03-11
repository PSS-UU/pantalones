import { combineReducers } from "redux";
import * as types from './types';

const INITIAL_STATE = {};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.auth.setUser:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  auth: authReducer,
});
