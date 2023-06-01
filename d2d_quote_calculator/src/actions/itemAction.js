import axios from "axios";
import {
  GET_QUOTES,
  LOGIN,
  CREATE_QUOTE,
  DELETE_QUOTE,
  GET_PROT_PRICE,
  UPDATE_PROT,
  GET_POLISH_PRICING,
  UPDATE_POLISH,
} from "./types";

export const getQuotes = () => (dispatch) => {
  axios.get("/quotes").then((res) =>
    dispatch({
      type: GET_QUOTES,
      payload: res.data,
    })
  );
};

export const createQuote = (item) => (dispatch) => {
  axios.post("/quotes", item).then((res) =>
    dispatch({
      type: CREATE_QUOTE,
      payload: res.data,
    })
  );
};

export const deleteQuote = (id) => (dispatch) => {
  console.log("deleted quote");
  axios.delete(`/quotes/${id}/delete`).then((res) =>
    dispatch({
      type: DELETE_QUOTE,
      payload: res.data,
    })
  );
};

export const login = (item) => (dispatch) => {
  console.log("Login");
  axios.post("accounts/login", item).then((res) =>
    dispatch({
      type: LOGIN,
      payload: res.data,
    })
  );
};

export const getProtPricing = () => (dispatch) => {
  axios.get("/pricing/protPricing").then((res) =>
    dispatch({
      type: GET_PROT_PRICE,
      payload: res.data,
    })
  );
};

export const updateProtPrice = (item) => (dispatch) => {
  console.log("Login");
  axios.post(`/pricing/updateProt/${item.id}`, item).then((res) =>
    dispatch({
      type: UPDATE_PROT,
      payload: res.data,
    })
  );
};

export const getPolishPricing = () => (dispatch) => {
  axios.get("/pricing/polishPricing").then((res) => {
    dispatch({
      type: GET_POLISH_PRICING,
      payload: res.data,
    });
  });
  return true;
};

export const updatePolishPricing = (item) => (dispatch) => {
  axios.post(`/pricing/updatePolish/${item.id}`, item).then((res) => {
    dispatch({
      type: UPDATE_POLISH,
      payload: res.data,
    });
  });
  return true;
};
