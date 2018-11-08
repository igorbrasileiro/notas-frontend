import { concatIdIfNotContain } from '../utils/helpers';
import { SAVE_USER, REMOVE_ALL_USERS, SET_LOGGED_USER } from '../actions/actionTypes';

const NO_LOGGED_USER = '-1';

const DEFAULT_STATE = {
  allIds: [],
  byId: {},
  loggedUserId: NO_LOGGED_USER,
};

function user(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.user._id]: {
            ...(state.byId[action.user._id] ? state.byId[action.user._id] : {}),
            ...action.user,
          },
        },
        allIds: concatIdIfNotContain(state.allIds, action.user._id),
      };

    case SET_LOGGED_USER:
      return {
        ...state,
        loggedUserId: action.id,
      };

    case REMOVE_ALL_USERS:
      return DEFAULT_STATE;

    default:
      return state;
  }
}

export default user;
