import { Dispatch } from "react";

import { SAVE_SUBJECT, REMOVE_SUBJECT } from "./actionTypes";
import { post, del } from "../utils/HTTPClient";

export const createStudentSubject = (input: object) => (
  dispatch: Dispatch<object>
) =>
  post("subject/student", input, null, localStorage.getItem("token")).then(
    (res) => {
      if (res.data) {
        dispatch({
          type: SAVE_SUBJECT,
          subject: res.data,
        });
      }
      return res;
    }
  );

export const deleteStudentSubject = (id: string) => (
  dispatch: Dispatch<object>
) =>
  del("subject/student/".concat(id), localStorage.getItem("token")).then(
    ({ data }) => {
      if (data) {
        dispatch({
          type: REMOVE_SUBJECT,
          id,
        });
      }
    }
  );

export const createTeacherSubject = (input: object) => (
  dispatch: Dispatch<object>
) =>
  post("subject", input, null, localStorage.getItem("token")).then((res) => {
    if (res.data) {
      dispatch({
        type: SAVE_SUBJECT,
        subject: res.data,
      });
    }

    return res;
  });

export const deleteTeacherSubject = (id: string) => (
  dispatch: Dispatch<object>
) =>
  del("subject/".concat(id), localStorage.getItem("token")).then(({ data }) => {
    if (data) {
      dispatch({
        type: REMOVE_SUBJECT,
        id,
      });
    }
  });
