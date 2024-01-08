import axios from "axios";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

// LOGIN
export const login = (email, password) => async (dispatch) => {
  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
  try {
    dispatch({ type: "USER_LOGIN_REQUEST" });

    const { data } = await axios.post(
      `/api/auth/login`,
      { email, password }
    );
   
      dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });
    
    localStorage.setItem("userInfo", JSON.stringify(data.user));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Unauthorized no Token") {
      dispatch(logout());
    }
    dispatch({
      type: "USER_LOGIN_FAIL",
      payload: message,
    });
  }
};

// LOGOUT
export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  const { data } = await axios.post(`/api/auth/signout`);
  <Redirect to={"/login"}/>
  dispatch({ type: "USER_LOGOUT" });
  dispatch({ type: "USER_LIST_RESET" });
};



export const forgotPassword = (email) => async (dispatch) => {

  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };
  try {

      dispatch({ type: "FORGOT_PASSWORD_REQUEST" });

      const { data } = await axios.post(
          '/api/auth/forgotpassword',
          {email}
      );

      dispatch({
          type: "FORGOT_PASSWORD_SUCCESS",
          payload: data.message,
      });

    toast.success(data.message, ToastObjects);

  } catch (error) {
      dispatch({
          type: "FORGOT_PASSWORD_FAIL",
          payload: error.response.data.message,
      });
  }
};


export const resetPassword = (token, password) => async (dispatch) => {

  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };

  try {

      dispatch({ type: "RESET_PASSWORD_REQUEST" });


      const { data } = await axios.put(
          `/api/auth/resetpassword/${token}`,
          {password},
      );

      dispatch({
          type: "RESET_PASSWORD_SUCCESS",
          payload: data.success,
      });
      toast.success(data.message, ToastObjects);
      dispatch(logout());

  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
      dispatch({
          type: "RESET_PASSWORD_FAIL",
          payload: error.response.data.message,
      });
      toast.error(message, ToastObjects);

  }
};

