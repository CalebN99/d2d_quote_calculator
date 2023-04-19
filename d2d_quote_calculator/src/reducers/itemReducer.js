/* eslint-disable import/no-anonymous-default-export */
import {
  GET_QUOTES,
  LOGIN,
  CREATE_QUOTE,
  DELETE_QUOTE,
  GET_PROT_PRICE,
  UPDATE_PROT,
  GET_POLISH_PRICING,
  UPDATE_POLISH
} from "../actions/types";


const initialState = {
  quotes: false,
  car: "Subaru",
  quote: 0,
  loggedIn: false,
  protPricing: [],
  polishPricing: [],
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
    case UPDATE_PROT:
      return {
        ...state,
        protPricing: action.payload
      }  
    case GET_POLISH_PRICING:
      return {
        ...state,
        polishPricing: action.payload
      }
    case UPDATE_POLISH:
      return {
        ...state
      } 
    default:
      return {
        ...state,
       
      };
  }
}
