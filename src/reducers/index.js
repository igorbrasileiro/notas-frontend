import { combineReducers } from "redux";

import user from "./user";
import subject from "./subject";

export default combineReducers({
  user,
  subject,
}); // add reducers here
