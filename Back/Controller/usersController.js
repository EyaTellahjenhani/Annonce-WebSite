const bcrypt = require("bcrypt");
const {
  getUsers,
  getUsersById,
  updateUsers,
  deleteUsers,
} = require("../Models/usersModels");

exports.afficherUsers = async (req, res) => {
  try {
    const results = await getUsers();
    res.status(201).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json("Error during login");
  }
};

exports.afficherMyProfile = async (req, res) => {
  const { UserID } = req.user;
  try {
    const results = await getUsersById(UserID);
    res.status(201).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json("Error during login");
  }
};

exports.afficherUsersParId = async (req, res) => {
  const { userid } = req.params;
  try {
    const results = await getUsersById(userid);
    res.status(201).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json("Error during login");
  }
};


exports.modifierProfile = async (req, res) => {

  const updateFields = {};

  
  // Extract fields from req.body that are not undefined
  if (req.body.firstName !== "") {
    updateFields.firstName = req.body.firstName;
  }
  if (req.body.lastName !== "") {
    updateFields.lastName = req.body.lastName;
  }
  if (req.body.email !== "") {
    updateFields.email = req.body.email;
  }
  if (req.body.phone !== "") {
    updateFields.phone = req.body.phone;
  }
  if (req.body.password !== "") {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    updateFields.password = hashedPassword;
  }



  const { UserID } = req.user;
    try {
      
      const results = await updateUsers(
        updateFields,
        UserID
      );
      if (results) {
        res.status(201).json("User modified successfully");
      } else {
        res.status(400).json("Failed to modify user");
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Error during modify user");
    }
  
};

exports.supprimerUsers = async (req, res) => {
  const { userid } = req.params;
  try {
    const results = await deleteUsers(userid);
    if (results) {
      res.status(201).json("User deleted successfully");
    } else {
      res.status(400).json("Failed to delete user");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Error during delete user");
  }
};
