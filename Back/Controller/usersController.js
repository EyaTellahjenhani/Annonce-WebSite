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
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json("Error during login");
  }
};

exports.afficherMyProfile = async (req, res) => {
  const { UserID } = req.user;
  try {
    const results = await getUsersById(UserID);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json("Error during login");
  }
};

exports.afficherUsersParId = async (req, res) => {
  const { userid } = req.params;
  try {
    const results = await getUsersById(userid);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json("Error during login");
  }
};


exports.modifierProfile = async (req, res) => {
  const { firstName, lastName, email, password, phone } = req.body;
  const { UserID } = req.user;
  if (firstName && lastName && email && password && phone) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const results = await updateUsers(
        firstName,
        lastName,
        email,
        hashedPassword,
        phone,
        UserID
      );
      if (results) {
        res.json("User modified successfully");
      } else {
        res.json("Failed to modify user");
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Error during modify user");
    }
  } else {
    res.json("Please enter all fields");
  }
};

exports.supprimerUsers = async (req, res) => {
  const { userid } = req.params;
  try {
    const results = await deleteUsers(userid);
    if (results) {
      res.json("User deleted successfully");
    } else {
      res.json("Failed to delete user");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Error during delete user");
  }
};
