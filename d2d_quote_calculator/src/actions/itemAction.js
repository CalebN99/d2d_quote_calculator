import axios from "axios";
import {
  GET_QUOTES

} from "./types";


export const getQuotes = () => (dispatch) => {
  axios.post("/api/users/add").then((res) =>
    dispatch({
      type: GET_QUOTES,
      payload: res.data,
    })
  );
};

