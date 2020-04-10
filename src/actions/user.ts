import { Dispatch } from "react";

import { SAVE_USER, SET_LOGGED_USER } from "./actionTypes";
import { get } from "../utils/HTTPClient";

export const fetchLoggedUser = () => (dispatch: Dispatch<object>) =>
  get("user", localStorage.getItem("token")).then((res) => {
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
