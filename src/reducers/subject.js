import { concatIdIfNotContain } from "../utils/helpers";
import {
  SAVE_SUBJECT,
  REMOVE_ALL_SUBJECTS,
  REMOVE_SUBJECT,
} from "../actions/actionTypes";

const DEFAULT_STATE = {
  allIds: [],
  byId: {},
};

function subject(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case SAVE_SUBJECT:
      return {
        ...state,
        byId: {
          ...state.byId,
          [action.subject._id]: {
            ...action.subject,
          },
        },
        allIds: concatIdIfNotContain(state.allIds, action.subject._id),
      };

    case REMOVE_SUBJECT:
      return {
        ...state,
        allIds: state.allIds.filter((id) => id !== action.id),
      };

    case REMOVE_ALL_SUBJECTS:
      return DEFAULT_STATE;

    default:
      return state;
  }
}

export default subject;
