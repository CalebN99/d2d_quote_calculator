import axios from "axios";
import {
  GET_QUOTES,

} from "./types";

// export const getItems = () => dispatch => {
//   dispatch(setItemsLoading());
//   axios.get("/api/users").then(res =>
//     dispatch({
//       type: GET_ITEMS,
//       payload: res.data
//     })
//   );
// };
export const createAccount = (item) => (dispatch) => {
  axios.post("/api/users/add", item).then((res) =>
    dispatch({
      type: CREATE_ACCOUNT,
      payload: res.data,
    })
  );
};

export const updateGroupID = (item) => (dispatch) => {
  axios
    .post(`/api/users/${item.id}/update`, { GroupID: item.GroupID })
    .then((res) =>
      dispatch({
        type: GROUPID_UPDATE,
        payload: res.data,
      })
    );
};

export const newGroupID = (item) => (dispatch) => {
  axios
    .post(`/api/users/${item.id}/updatec`, { GroupID: item.GroupID })
    .then((res) =>
      dispatch({
        type: GROUPID_UPDATE,
        payload: res.data,
      })
    );
};

export const addGroups = (item) => (dispatch) => {
  console.log(item.Groups);
  axios
    .post(`/api/users/${item.id}/updateGroups`, { NameOfGroup: item.Groups })
    .then((res) =>
      dispatch({
        type: ADD_GROUPS,
        payload: res.data,
      })
    );
};

export const doLogin = (loggedUser) => (dispatch) => {
  axios.post("/api/users/login", loggedUser).then((res) =>
    dispatch({
      type: AUTH_LOGIN,
      payload: res.data,
    })
  );
};

export const createGroup = (item) => (dispatch) => {
  axios.post("/api/groups", item).then((res) =>
    dispatch({
      type: CREATE_GROUP,
      payload: res.data,
    })
  );
};

//

//Bug Posts

export const addBug = (item) => (dispatch) => {
  axios.post("/api/bugs", item).then((res) =>
    dispatch({
      type: ADD_BUG,
      payload: res.data,
    })
  );
};

export const getBugs = (item) => (dispatch) => {
  console.log(item);
  axios.get(`/api/bugs/${item.GroupID}`).then((res) =>
    dispatch({
      type: GET_BUGS,
      payload: res.data,
    })
  );
};

export const deleteBug = (item) => (dispatch) => {
  axios.delete(`/api/bugs/${item}/delete`).then(
    (res) =>
      dispatch({
        type: DELETE_BUG,
        payload: item,
      }),
    console.log("Axios Delete")
  );
};
export const updateBug = (item) => (dispatch) => {
  console.log("Axios ID" + " " + item.id);
  console.log(item.ClaimedID);
  axios
    .post(`/api/bugs/${item.id}/update`, {
      ClaimerName: item.ClaimerName,
      ClaimerID: item.ClaimerID,
    })
    .then((res) =>
      dispatch({
        type: UPDATE_BUG,
        payload: res.data,
      })
    );
  console.log("Axios" + " " + item.ClaimerName);
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
