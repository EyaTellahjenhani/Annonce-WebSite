import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";


import {
  RequestDeleteReducer,
  requestDeliveredReducer,
  requestDetailsReducer,
  requestListReducer,
} from "./Reducers/RequestReducres";
import { forgotPasswordReducer, userLoginReducer } from "./Reducers/userReducers";
import { UserDeleteReducer, userListReducer, userUpdateReducer } from "./Reducers/AdminReducers";


const reducer = combineReducers({
  userLogin: userLoginReducer,
  forgotPassword: forgotPasswordReducer,
  userList: userListReducer,
  userDelete:UserDeleteReducer,
  userUpdate:userUpdateReducer,
  requestList: requestListReducer,
  requestDetails: requestDetailsReducer,
  requestDeliver: requestDeliveredReducer,
  requestDelete:RequestDeleteReducer,


});

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
