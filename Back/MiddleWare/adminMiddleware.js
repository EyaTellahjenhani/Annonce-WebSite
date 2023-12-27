exports.adminMiddleware = (req, res, next) => {
  const user = req.user;

  if (!user || !user.IsAdmin) {
    return res.status(401).json({ message: "Unauthorized as an Admin" });
  }
  next();
};
