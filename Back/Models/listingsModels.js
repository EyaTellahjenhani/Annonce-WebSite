const configBd = require("./configDb");


exports.getListings = async () => {
  const [results] = await configBd.execute(
    "SELECT FirstName, LastName, Phone, listings.ListingID, Title, Description, Price, Location, CategoryName, DatePosted, IsAccepted, Statu FROM listings, users, categories WHERE listings.UserID = users.UserID AND listings.CategoryID = categories.CategoryID AND Statu = 'Accepted' ORDER BY DatePosted DESC");
  if (results.length > 0) {
    for (const result of results) {
      const [imageRes] = await configBd.execute("SELECT ImageURL FROM images WHERE ListingID = ?", [result.ListingID]);
      result.images = imageRes;
    }
    return results;
  } else {
    return null;
  }
};

exports.getFiltredList = async (category,title) => {

  let  sql = `SELECT FirstName, LastName, Phone, listings.ListingID, Title, Description, Price, Location, CategoryName, DatePosted FROM listings, users, categories WHERE listings.UserID = users.UserID AND listings.CategoryID = categories.CategoryID  AND Statu = 'Accepted' `;

  if (category) {
    sql += ` AND CategoryName = '${category}' ORDER BY DatePosted DESC` 
  }
  if (title) {
    sql += ` And Title LIKE '%${title}%' ` 
  }
  const [results] = await configBd.execute(sql);
  if (results.length > 0) {
    for (const result of results) {
      const [imageRes] = await configBd.execute("SELECT ImageURL FROM images WHERE ListingID = ?", [result.ListingID]);
      result.images = imageRes;
    }
    return results;
  } else {
    return null;
  }
};


exports.getListingsForAdmin = async () => {
  const [results] = await configBd.execute(
    "SELECT FirstName, LastName, Phone, listings.ListingID, Title, Description, Price, Location, CategoryName, DatePosted, IsAccepted, Statu FROM listings, users, categories WHERE listings.UserID = users.UserID AND listings.CategoryID = categories.CategoryID ORDER BY DatePosted DESC");
  if (results.length > 0) {
    for (const result of results) {
      const [imageRes] = await configBd.execute("SELECT ImageURL FROM images WHERE ListingID = ?", [result.ListingID]);
      result.images = imageRes;
    }
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
    for (const img of image) {
      const [imageRes] = await configBd.execute(
        "INSERT INTO images (ListingID, ImageURL) VALUES (?,?) ",
        [results.insertId, img]
      );
    }
   
    return results;
  } else {
    return null;
  }
};

exports.updateListings = async (updateFields, id) => {
  const { title, description, price, category, image, Location } = updateFields;


  if (image !== undefined ) {
        
    const [imageRes] = await configBd.execute(
      "DELETE FROM images WHERE ListingID=?",
      [id]
    );
    for (const img of image) {
      const [imageRes] = await configBd.execute(
        "INSERT INTO images (ListingID, ImageURL) VALUES (?,?) ",
        [id, img]
      );
    }
}

  const setFields = [];
  const values = [];

  if (title !== undefined) {
    setFields.push(`Title = ?`);
    values.push(title);
  }
  if (description !== undefined) {
    setFields.push(`Description = ?`);
    values.push(description);
  }
  if (price !== undefined) {
    setFields.push(`Price = ?`);
    values.push(price);
  }
  if (category !== undefined) {
    setFields.push(`CategoryID = ?`);
    values.push(category);
  }
 
  if (Location !== undefined) {
    setFields.push(`Location = ?`);
    values.push(Location);
  }

  if (setFields.length === 0) {
    // No fields to update
    return true;
  }

  const setClause = setFields.join(', ');
  const queryString = `UPDATE listings SET ${setClause} WHERE ListingID = ?`;
  values.push(id);


  try {
    const result = await configBd.execute(queryString, values);

     

    return true
  } catch (error) {
    console.error(error);
    throw error;
  }
};

exports.rejectListings = async (ListingID) => {
  const [results] = await configBd.execute(
    "UPDATE listings SET IsAccepted = 0 , Statu = 'Refused' WHERE ListingID=?",
    [ListingID]
  );
  console.log(results)
  if (results.affectedRows > 0) {
    return results;
  } else {
    return null;
  }
};


exports.deleteListings = async (id) => {
  const [results] = await configBd.execute(
    "DELETE FROM listings WHERE ListingID=?",
    [id]
  );
  if (results.affectedRows > 0) {
    return results;
  } else {
    return null;
  }
};

exports.getListingsById = async (id) => {
  const [results] = await configBd.execute(
    "SELECT FirstName, LastName, Phone, Title, Description, Price, Location, CategoryName, DatePosted FROM listings, users, categories WHERE listings.UserID = users.UserID AND listings.CategoryID = categories.CategoryID  AND listings.ListingID = ?",
    [id]
  );
  if (results.length > 0) {
    const [imageRes] = await configBd.execute(
      "SELECT ImageURL FROM images WHERE ListingID = ?",
      [id]
    );
    results[0].images = imageRes;
    return results;
  } else {
    return null;
  }
};

exports.getMyListings = async (UserID) => {
  const [results] = await configBd.execute(
    "SELECT * FROM listings WHERE UserID = ? ORDER BY DatePosted DESC ", [UserID]
  );
  if (results.length > 0) {
    for (const result of results) {
      const [imageRes] = await configBd.execute("SELECT ImageURL FROM images WHERE ListingID = ?", [result.ListingID]);
      result.images = imageRes;
    }
    return results;
  } else {
    return null;
  }
};

exports.acceptedListings = async (ListingID) => {
  const [results] = await configBd.execute(
    "UPDATE listings SET IsAccepted = 1 , Statu = 'Accepted' WHERE ListingID = ?", [ListingID]
  );
  if (results.affectedRows > 0) {
    return results;
  } else {
    return null;
  }
};