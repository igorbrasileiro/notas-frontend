import user from './user';
import subject from './subject';
import { combineReducers } from 'redux';

export default combineReducers({
  user,
  subject,
}); // add reducers here
