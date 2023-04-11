import axios from "axios";
import { GET_QUOTES, LOGIN } from "./types";

export const getQuotes = () => (dispatch) => {
  axios.post("/api/users/add").then((res) =>
    dispatch({
      type: GET_QUOTES,
      payload: res.data,
    })
  );
};

export const login = (item) => (dispatch) => {
  console.log(item)
  axios.post("accounts/login", item).then((res) =>
    dispatch({
      type: LOGIN,
      payload: res.data,
    })
  );
};
