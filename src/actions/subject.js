import { SAVE_SUBJECT, REMOVE_SUBJECT } from './actionTypes';
import { get, post, del } from '../utils/HTTPClient';

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

export const deleteStudentSubject = id => dispatch =>
  del('subject/student/'.concat(id), localStorage.getItem('token')).then(({ data }) => {
    if (data) {
      dispatch({
        type: REMOVE_SUBJECT,
        id,
      });
    }
  });

export const createTeacherSubject = input => dispatch =>
  post('subject', input, null, localStorage.getItem('token')).then(({ data }) => {
    if (data) {
      dispatch({
        type: SAVE_SUBJECT,
        subject: data,
      });
    }
  });

export default {};
