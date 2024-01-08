const express = require("express");
const {
  afficherListings,
  ajouterListings,
  modifierListings,
  supprimerListings,
  afficherListingsParId,
  afficherMyListings,
  acceptedListings,
  afficherListingsForAdmin,
  RejectListings,
} = require("../Controller/listingsController");
const { authMiddleware } = require("../MiddleWare/authMiddleware");
const { adminMiddleware } = require("../MiddleWare/adminMiddleware");
const listingsRouter = express.Router();

listingsRouter.get("/", afficherListings);
listingsRouter.get("/admin/", authMiddleware, adminMiddleware, afficherListingsForAdmin);
listingsRouter.get("/mylistings", authMiddleware, afficherMyListings);
listingsRouter.post("/", authMiddleware , ajouterListings);
listingsRouter.get("/:id", afficherListingsParId);
listingsRouter.put("/:id", authMiddleware, modifierListings);
listingsRouter.put("/accepted/:id", authMiddleware, adminMiddleware, acceptedListings);
listingsRouter.put("/refused/:id", authMiddleware, adminMiddleware, RejectListings);
listingsRouter.delete("/:id", authMiddleware, supprimerListings);

module.exports = listingsRouter;
