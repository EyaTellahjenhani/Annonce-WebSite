import { logout } from "./userActions";
import axios from "axios";

export const listRequests = () => async (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  try {
    dispatch({ type: "REQUEST_LIST_REQUEST" });

    const { data } = await axios.get(`/api/listings/admin`)

    dispatch({ type: "REQUEST_LIST_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Unauthorized no Token") {
      dispatch(logout());
    }
    dispatch({
      type: "REQUEST_LIST_FAIL",
      payload: message,
    });
  }
};

// ORDER DETAILS
export const getRequestDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "REQUEST_DETAILS_REQUEST" });

    const { data } = await axios.get(`/api/request/${id}`);
    dispatch({ type: "REQUEST_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Unauthorized no Token") {
      dispatch(logout());
    }
    dispatch({
      type: "REQUEST_DETAILS_FAIL",
      payload: message,
    });
  }
};



//  Accepted
export const AcceptRequest = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "REQUEST_DELIVERED_REQUEST" });

    

    const { data } = await axios.put(
      `/api/listings/accepted/${id}`,
      {},
    );
    dispatch({ type: "REQUEST_DELIVERED_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Unauthorized no Token") {
      dispatch(logout());
    }
    dispatch({
      type: "REQUEST_DELIVERED_FAIL",
      payload: message,
    });
  }
};

export const deleteRequest = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "REQUEST_DELETE_REQUEST" });
console.log("error",id)
    const {data} = await axios.put(`/api/listings/refused/${id}`);
    console.log(data)

    dispatch({ type: "REQUEST_DELETE_SUCCESS" });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Unauthorized no Token") {
      dispatch(logout());
    }
    dispatch({
      type: "REQUEST_DELETE_FAIL",
      payload: message,
    });
  }
};


