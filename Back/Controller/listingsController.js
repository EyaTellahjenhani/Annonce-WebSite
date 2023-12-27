const e = require("express");
const { getListings, insertListings, updateListings, deleteListings, getListingsById, getMyListings, acceptedListings } = require("../Models/listingsModels");

exports.afficherListings = async (req, res) => {
  try {
    const results = await getListings();
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json("Error during login");
  }
}

exports.ajouterListings = async (req, res) => {
  const { title, description, price, category, image, Location } = req.body;
  const { UserID } = req.user;
  if (title && description && price && category && image && Location) {
    try {
      const results = await insertListings(title, description, price, category, image, Location, UserID);
      if (results) {
        res.status(200).json("Listing inserted successfully");
      } else {
        res.status(401).json("Failed to insert listing");
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Error during insert");
    }
  } else {
    res.json("Please enter all fields");
  }
}

exports.modifierListings = async (req, res) => { 
  const { title, description, price, category, image } = req.body;
  const { id } = req.params;
  if (title && description && price && category && image && Location) {
    try {
      const results = await updateListings(title, description, price, category, image, Location, id);
      if (results) {
        res.status(200).json("Update successfully");
      } else {
        res.status(401).json("Failed to update");
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Error during update");
    }
  } else {
    res.json("Please enter all fields");
  }
}

exports.supprimerListings = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await deleteListings(id);
    if (results) {
      res.json("Delete successfully");
    } else {
      res.json("Failed to delete");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Error during delete");
  }
}

exports.afficherListingsParId = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await getListingsById(id);
    if (results) {
      res.status(200).json(results);
    } else {
      res.status(401).json("Failed to get listing");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Error during login");
  }
};

exports.afficherMyListings = async (req, res) => {
  const { UserID } = req.user;
  try {
    const results = await getMyListings(UserID);
    if (results) {
      res.status(200).json(results);
    } else {
      res.status(401).json("Failed to get listing");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Error during get listing");
  }
};

exports.acceptedListings = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await acceptedListings(id);
    if (results) {
      res.status(200).json("Listing accepted successfully");
    } else {
      res.status(401).json("Failed to accepted listing");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Error during accepted listing");
  }
};