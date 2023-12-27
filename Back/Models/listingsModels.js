const configBd = require("./configDb");
exports.getListings = async () => {
  const [results] = await configBd.execute(
    "SELECT FirstName, LastName, Phone, listings.ListingID, Title, Description, Price, Location, CategoryName, ImageURL FROM listings, users, categories, images WHERE listings.UserID = users.UserID AND listings.CategoryID = categories.CategoryID AND listings.ListingID = images.ListingID"
  );
  if (results.length > 0) {
    return results;
  } else {
    return null;
  }
};

exports.insertListings = async (
  title,
  description,
  price,
  category,
  image,
  Location,
  UserID
) => {
  const [results] = await configBd.execute(
    "INSERT INTO listings (UserID, CategoryID, Title, Description, Price, Location, DateExp) VALUES (?,?,?,?,?,?,DATE_ADD(NOW(), INTERVAL 30 DAY)) ",
    [
      UserID,
      category,
      title,
      description,
      price,
      Location
    ]
  );
  if (results.affectedRows > 0) {
    const [imageRes] = await configBd.execute(
      "INSERT INTO images (ListingID, ImageURL) VALUES (?,?) ",
      [results.insertId, image]
    );
    return imageRes;
  } else {
    return null;
  }
};

exports.updateListings = async (
  title,
  description,
  price,
  category,
  image,
  Location,
  ListingID
) => {
  const [results] = await configBd.execute(
    "UPDATE listings SET CategoryID =?, Title=?, Description=?, Price=?, Location=?  WHERE ListingID =?",
    [category, title, description, price, Location, ListingID]
  );
  if (results.affectedRows > 0) {
    const [imageRes] = await configBd.execute(
      "UPDATE images SET ImageURL=?  WHERE ListingID =?",
      [image, ListingID]
    );
    return imageRes;
  } else {
    return null;
  }
};

exports.deleteListings = async (ListingID) => {
  const [results] = await configBd.execute(
    "DELETE FROM listings WHERE ListingID=?",
    [ListingID]
  );
  if (results.affectedRows > 0) {
    return results;
  } else {
    return null;
  }
};

exports.getListingsById = async (id) => {
  const [results] = await configBd.execute(
    "SELECT FirstName, LastName, Phone, Title, Description, Price, Location, CategoryName, ImageURL FROM listings, users, categories, images WHERE listings.UserID = users.UserID AND listings.CategoryID = categories.CategoryID AND listings.ListingID = images.ListingID AND listings.ListingID = ?",
    [id]
  );
  if (results.length > 0) {
    return results;
  } else {
    return null;
  }
};

exports.getMyListings = async (UserID) => {
  const [results] = await configBd.execute(
    "SELECT * FROM listings WHERE UserID = ?", [UserID]
  );
  if (results.length > 0) {
    return results;
  } else {
    return null;
  }
};

exports.acceptedListings = async (ListingID) => {
  const [results] = await configBd.execute(
    "UPDATE listings SET IsAccepted = 1 WHERE ListingID = ?", [ListingID]
  );
  if (results.affectedRows > 0) {
    return results;
  } else {
    return null;
  }
};