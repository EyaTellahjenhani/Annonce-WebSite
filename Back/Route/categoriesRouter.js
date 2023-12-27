const express = require("express");
const {
  afficherCategories,
  ajouterCategories,
  afficherCategoriesParId,
  modifierCategories,
  supprimerCategories,
} = require("../Controller/categoriesController");
const { authMiddleware } = require("../MiddleWare/authMiddleware");
const { adminMiddleware } = require("../MiddleWare/adminMiddleware");
const categoriesRouter = express.Router();

categoriesRouter.get("/", afficherCategories);
categoriesRouter.get("/:id", afficherCategoriesParId);
categoriesRouter.post("/", authMiddleware, adminMiddleware, ajouterCategories);
categoriesRouter.put("/:id", authMiddleware, adminMiddleware, modifierCategories);
categoriesRouter.delete("/:id", authMiddleware, adminMiddleware, supprimerCategories);

module.exports = categoriesRouter;
