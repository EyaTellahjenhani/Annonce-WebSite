const configBd = require("./configDb");
const crypto = require("crypto");

exports.findUserByEmail = async (email) => {
  const [userExist] = await configBd.execute(
    "SELECT * FROM users WHERE email = ? ",
    [email]
  );
  if (userExist.length > 0) {
    return userExist;
  } else {
    return null;
  }
};

exports.insertUser = async (firstName, lastName, email, password, phone) => {
  const [results] = await configBd.execute(
    "INSERT INTO users (firstName, lastName, email, password, phone) VALUES (?,?,?,?,?) ",
    [firstName, lastName, email, password, phone]
  );
  if (results.affectedRows > 0) {
    return results;
  } else {
    return null;
  }
};

exports.generateResetToken = async (email) => {
  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const [results] = await configBd.execute(
    "UPDATE users SET resetPasswordToken = ? WHERE email = ?",
    [resetPasswordToken, email]
  );
  if (results.affectedRows > 0) {
    return resetToken;
  } else {
    return null;
  }
};

exports.resetUserPassword = async (resetToken, password) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const [results] = await configBd.execute(
    "UPDATE users SET password = ?, resetPasswordToken = NULL WHERE resetPasswordToken = ?",
    [password, resetPasswordToken]
  );
  if (results.affectedRows > 0) {
    return results;
  } else {
    return null;
  }
};
