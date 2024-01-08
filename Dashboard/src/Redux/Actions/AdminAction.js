import axios from "axios";
import { logout } from "./userActions";



export const listUser = () => async (dispatch, getState) => {
    try {
      dispatch({ type: "USER_LIST_REQUEST" });
  
  
      const { data } = await axios.get(`/api/users/`);
  
      dispatch({ type: "USER_LIST_SUCCESS", payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Unauthorized no Token") {
        dispatch(logout());
      }
      dispatch({
        type: "USER_LIST_FAIL",
        payload: message,
      });
    }
  };
  
  
  export const deleteUser = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: "USER_DELETE_REQUEST" });
  
      await axios.delete(`/api/users/${id}`);
  
      dispatch({ type: "USER_DELETE_SUCCESS" });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Unauthorized no Token") {
        dispatch(logout());
      }
      dispatch({
        type: "USER_DELETE_FAIL",
        payload: message,
      });
    }
  };
  
  
  
  // UPDATE user
  export const updateUser = (user) => async (dispatch, getState) => {
    try {
      dispatch({ type: "USER_UPDATE_REQUEST" });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      
  
      const { data } = await axios.put(
        `/api/users/${user.id}`,
        user,
      );

  
      dispatch({ type: "USER_UPDATE_SUCCESS", payload: data });
      dispatch({ type: "USER_EDIT_SUCCESS", payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Unauthorized no Token") {
        dispatch(logout());
      }
      dispatch({
        type: "USER_UPDATE_FAIL",
        payload: message,
      });
    }
  };
  

