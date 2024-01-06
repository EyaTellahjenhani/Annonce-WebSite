const { getListings, insertListings, updateListings, deleteListings, getListingsById, getMyListings, acceptedListings, getListingsByCategory, getFiltredList } = require("../Models/listingsModels");
const cloudinary = require('cloudinary').v2;    

exports.afficherListings = async (req, res) => {
  try {
    const { category,title } = req.query;

    if (category ||title ) {

      const results = await getFiltredList(category,title);

      res.status(200).json(results);
    } else {
    const results = await getListings();
    res.status(200).json(results);
  } 
}catch (err) {
    console.error(err);
    res.status(500).json("Error during listing");
  }
}

exports.ajouterListings = async (req, res) => {
  try {
  const { title, description, price, category, image, Location } = req.body;
  const { UserID } = req.user;

  if (title && description && price && category && image.length>0 && Location) {
  
    let images = [];
    if (typeof image === "string") {
        images.push(image);
    } else {
        images = image;
    }

    const imagesLink = [];

    for (const element of images) {
        const result = await cloudinary.uploader.upload(element, {
            folder: `listing/`,
        });

        imagesLink.push(result.secure_url);
    }
    
      const results = await insertListings(title, description, price, category, imagesLink, Location, UserID);
      if (results) {
        res.status(200).json("Listing inserted successfully");
      } else {
        res.status(401).json("Failed to insert listing");
      }
     
    }  else {
      res.status(400).json("Please enter all fields");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Error during insert");
  }
}




exports.modifierListings = async (req, res) => {
  const { id } = req.params;
  const updateFields = {};
  
  // Extract fields from req.body that are not undefined
  if (req.body.title !== undefined) {
    updateFields.title = req.body.title;
  }
  if (req.body.description !== undefined) {
    updateFields.description = req.body.description;
  }
  if (req.body.price !== undefined) {
    updateFields.price = req.body.price;
  }
  if (req.body.category !== undefined) {
    updateFields.category = req.body.category;
  }
  if (req.body.image !== undefined) {
    let images = [];
    if (typeof req.body.image === "string") {
      images.push(req.body.image);
    } else {
      images = req.body.image;
    }

    const imagesLink = [];

    for (const element of images) {
      const result = await cloudinary.uploader.upload(element, {
        folder: `listing/`,
      });

      imagesLink.push(result.secure_url);
    }

    updateFields.image = imagesLink;
  }
  if (req.body.Location !== undefined) {
    updateFields.Location = req.body.Location;
  }

  try {
    const results = await updateListings(updateFields, id);
    if (results) {
      res.status(200).json("Update successfully");
    } else {
      res.status(401).json("Failed to update");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Error during update");
  }
};










exports.supprimerListings = async (req, res) => {
  const { id } = req.params;
  try {
    const results = await deleteListings(id);
    if (results) {
      res.status(201).json("Delete successfully");
    } else {
      res.status(400).json("Failed to delete");
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