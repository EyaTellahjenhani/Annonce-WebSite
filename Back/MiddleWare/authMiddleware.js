const { getUsersById } = require("../Models/usersModels");
const jwt = require("jsonwebtoken");

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized no Token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await getUsersById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized Wrong User Data" });
    }
    req.user = user[0];
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Unauthorized no Token", error: error.message });
  }
};
