import {
  GET_ITEMS,
  CREATE_ACCOUNT,
  ITEMS_LOADING,
  AUTH_LOGIN,
  GROUPID_UPDATE,
  ADD_BUG,
  GET_BUGS,
  DELETE_BUG,
  UPDATE_BUG,
  ADD_GROUPS,
  CREATE_GROUP,
} from "../actions/types";
import { startSession } from "mongoose";

const initialState = {
  items: [],
  user: [],
  bugs: [],
  loading: false,
  loggedIn: false,

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
    case GET_ITEMS:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };
    case CREATE_ACCOUNT:
      return {
        ...state,
      };
    case CREATE_GROUP:
      return {
        ...state,
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case AUTH_LOGIN:
      if (action.payload !== "") {
        return {
          ...state,
          user: action.payload,
          loggedIn: true,
        };
      } else if (action.payload === "") {
        return {
          ...state,
        };
      }

    case GROUPID_UPDATE:
      return {
        ...state,
        user: action.payload,
      };
    case ADD_GROUPS:
      return {
        ...state,
        user: action.payload,
      };
    case ADD_BUG:
      return {
        ...state,
        bugs: [action.payload, ...state.bugs],
      };
    case GET_BUGS:
      return {
        ...state,
        bugs: action.payload,
      };

    case DELETE_BUG:
      return {
        ...state,
        bugs: state.bugs.filter((bug) => bug._id !== action.payload),
      };

    case UPDATE_BUG:
      let i;
      for (i = 0; i < state.bugs.length; i++) {
        if (state.bugs[i]._id === action.payload._id) {
          state.bugs[i] = action.payload;
        }
      }
      return {
        ...state,
      };
    default:
      return {
        ...state,
      };
  }
}
