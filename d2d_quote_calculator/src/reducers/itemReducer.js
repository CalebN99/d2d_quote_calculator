/* eslint-disable import/no-anonymous-default-export */
import {
  GET_QUOTES,
} from "../actions/types";


const initialState = {
  quotes: [],
  car: "Subaru",
  quote: 1650,
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
        items: action.payload,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
}
