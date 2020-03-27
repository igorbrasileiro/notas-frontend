import { REMOVE_ALL_USERS, REMOVE_ALL_SUBJECTS } from "./actionTypes";

export const clearStore = (dispatch) => {
  dispatch({
    type: REMOVE_ALL_USERS,
  });
  dispatch({
    type: REMOVE_ALL_SUBJECTS,
  });
};
