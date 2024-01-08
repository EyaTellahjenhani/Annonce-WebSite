const express = require("express");
const {
  Login,
  SignUp,
  SignOut,
  ForgotPassword,
  ResetPassword,
  emailVerification,
} = require("../Controller/authController");
const authRouter = express.Router();

authRouter.post("/login", Login);
authRouter.post("/signUp", SignUp);
authRouter.post("/signout", SignOut);
authRouter.post("/forgotpassword", ForgotPassword);
authRouter.put("/resetpassword/:resetToken", ResetPassword);
authRouter.get("/emailconfirmation/:token", emailVerification);

module.exports = authRouter;
