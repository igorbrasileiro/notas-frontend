import { REMOVE_ALL_USERS } from './actionTypes';

export const clearStore = dispatch => {
  dispatch({
    type: REMOVE_ALL_USERS,
  });
};

export default {};
