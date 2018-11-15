import { SAVE_USER, SET_LOGGED_USER, SAVE_SUBJECT } from './actionTypes';
import { get, post } from '../utils/HTTPClient';

export const fetchLoggedUser = () => dispatch =>
  get('user', localStorage.getItem('token')).then(res => {
    dispatch({
      type: SAVE_USER,
      user: res.data,
    });
    dispatch({
      type: SET_LOGGED_USER,
      id: res.data._id,
    });
    return res;
  });

export const fetchStudentSubjects = () => dispatch =>
  get('subject/student', localStorage.getItem('token')).then(res => {
    if (res.data && res.data instanceof Array) {
      res.data.forEach(subject => {
        dispatch({
          type: SAVE_SUBJECT,
          subject,
        });
      });
    }
  });

export const createStudentSubject = input => dispatch =>
  post('subject/student', input, null, localStorage.getItem('token')).then(res => {
    if (res.data) {
      dispatch({
        type: SAVE_SUBJECT,
        subject: res.data,
      });
    }
    return res;
  });

export default {};
