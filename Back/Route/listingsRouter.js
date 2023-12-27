const express = require("express");
const {
  afficherListings,
  ajouterListings,
  modifierListings,
  supprimerListings,
  afficherListingsParId,
  afficherMyListings,
  acceptedListings,
} = require("../Controller/listingsController");
const { authMiddleware } = require("../MiddleWare/authMiddleware");
const listingsRouter = express.Router();

listingsRouter.get("/", afficherListings);
listingsRouter.get("/mylistings", authMiddleware, afficherMyListings);
listingsRouter.post("/", authMiddleware , ajouterListings);
listingsRouter.get("/:id", afficherListingsParId);
listingsRouter.put("/:id", authMiddleware, modifierListings);
listingsRouter.put("/accepted/:id", authMiddleware, acceptedListings);
listingsRouter.delete("/:id", authMiddleware, supprimerListings);

module.exports = listingsRouter;
