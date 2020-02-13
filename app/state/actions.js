import * as types from "./types";

export const setUser = user => {
  return {
    type: types.auth.setUser,
    payload: user
  };
};
