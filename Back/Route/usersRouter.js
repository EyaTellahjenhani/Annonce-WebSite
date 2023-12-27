const express = require("express");
const {
  afficherUsers,
  afficherUsersParId,
  supprimerUsers,
  afficherMyProfile,
  modifierProfile,
} = require("../Controller/usersController");
const { authMiddleware } = require("../MiddleWare/authMiddleware");
const { adminMiddleware } = require("../MiddleWare/adminMiddleware");
const usersRouter = express.Router();

usersRouter.get("/", authMiddleware, adminMiddleware, afficherUsers);
usersRouter.get("/profile", authMiddleware, afficherMyProfile);
usersRouter.put("/profile", authMiddleware, modifierProfile);
usersRouter.get("/:userid", authMiddleware, adminMiddleware, afficherUsersParId);
usersRouter.delete("/:userid", authMiddleware, supprimerUsers);

module.exports = usersRouter;
