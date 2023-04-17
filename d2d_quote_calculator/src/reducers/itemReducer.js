/* eslint-disable import/no-anonymous-default-export */
import {
  GET_QUOTES,
  LOGIN,
  CREATE_QUOTE,
  DELETE_QUOTE,
  GET_PROT_PRICE
} from "../actions/types";


const initialState = {
  quotes: false,
  car: "Subaru",
  quote: 0,
  loggedIn: false,
  protPricing: [],
  auth: (a = initialState) => {
    if (a.user.user.length > 0) {
      return {
        loadingIn: true,
      };
    }
  },
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_QUOTES:
      return {
        ...state,
        quotes: action.payload.reverse(),
      };
    case LOGIN:
      return {
        ...state,
        loggedIn: action.payload
      }
    case CREATE_QUOTE:
      return {
        ...state,
        quote: action.payload
      }  
    case DELETE_QUOTE:
      return {
        ...state
      }  
    case GET_PROT_PRICE:
      return {
        ...state,
        protPricing: action.payload

      } 
    default:
      return {
        ...state,
       
      };
  }
}
