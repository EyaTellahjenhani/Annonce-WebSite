const express = require("express");
const {
  Login,
  SignUp,
  SignOut,
  ForgotPassword,
  ResetPassword,
} = require("../Controller/authController");
const authRouter = express.Router();

authRouter.post("/login", Login);
authRouter.post("/signUp", SignUp);
authRouter.post("/signout", SignOut);
authRouter.post("/forgotpassword", ForgotPassword);
authRouter.put("/resetpassword/:resetToken", ResetPassword);

module.exports = authRouter;
