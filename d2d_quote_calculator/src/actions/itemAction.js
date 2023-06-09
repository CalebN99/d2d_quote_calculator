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
  let url = "https://" + window.location.host.toString() + "/d0KWTCBB1EwHBuBT/quotes";

  axios.get(url).then((res) =>
    dispatch({
      type: GET_QUOTES,
      payload: res.data,
    })
  );
};

export const createQuote = (item) => (dispatch) => {
  let url = "https://" + window.location.host.toString() + "/d0KWTCBB1EwHBuBT/quotes";

  axios.post(url, item).then((res) =>
    dispatch({
      type: CREATE_QUOTE,
      payload: res.data,
    })
  );
};

export const deleteQuote = (id) => (dispatch) => {
  let url = "https://" + window.location.host.toString() + `/d0KWTCBB1EwHBuBT/quotes/${id}/delete`;
  axios.delete(url).then((res) =>
    dispatch({
      type: DELETE_QUOTE,
      payload: res.data,
    })
  );
};

export const login = (item) => (dispatch) => {
  let url = "https://" + window.location.host.toString() + "/d0KWTCBB1EwHBuBT/accounts/login";
  axios.post(url, item).then((res) =>
    dispatch({
      type: LOGIN,
      payload: res.data,
    })
  );
};

export const getProtPricing = () => (dispatch) => {
  let url = "https://" + window.location.host.toString() + "/d0KWTCBB1EwHBuBT/pricing/protPricing";
  axios.get(url).then((res) =>
    dispatch({
      type: GET_PROT_PRICE,
      payload: res.data,
    })
  );
};

export const updateProtPrice = (item) => (dispatch) => {
  let url = "https://" + window.location.host.toString() + `/d0KWTCBB1EwHBuBT/pricing/updateProt/${item.id}`;
  axios.post(url, item).then((res) =>
    dispatch({
      type: UPDATE_PROT,
      payload: res.data,
    })
  );
};

export const getPolishPricing = () => (dispatch) => {
  let url = "https://" + window.location.host.toString() + "/d0KWTCBB1EwHBuBT/pricing/polishPricing";
  axios.get(url).then((res) => {
    dispatch({
      type: GET_POLISH_PRICING,
      payload: res.data,
    });
  });
  return true;
};

export const updatePolishPricing = (item) => (dispatch) => {
  let url = "https://" + window.location.host.toString() + `/d0KWTCBB1EwHBuBT/pricing/updatePolish/${item.id}`;

  axios.post(url, item).then((res) => {
    dispatch({
      type: UPDATE_POLISH,
      payload: res.data,
    });
  });
  return true;
};
