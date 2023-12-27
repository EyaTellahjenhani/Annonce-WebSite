const configBd = require("./configDb");
exports.getUsers = async () => {
  const [results] = await configBd.execute("SELECT * FROM users");
  if (results.length > 0) {
    return results;
  } else {
    return null;
  }
};

exports.getUsersById = async (userid) => {
  const [results] = await configBd.execute(
    "SELECT * FROM users WHERE UserID =?",
    [userid]
  );
  if (results.length > 0) {
    return results;
  } else {
    return null;
  }
};

exports.updateUsers = async (
  firstName,
  lastName,
  email,
  hashedPassword,
  phone,
  UserID
) => {
  const [results] = await configBd.execute(
    "UPDATE users SET FirstName=?, LastName=?, Password=?, Email=?, Phone=? WHERE UserID =?",
    [firstName, lastName, hashedPassword, email, phone, UserID]
  );
  if (results.affectedRows > 0) {
    return results;
  } else {
    return null;
  }
};

exports.deleteUsers = async (userid) => {
  const [results] = await configBd.execute(
    "DELETE FROM users WHERE UserID =?",
    [userid]
  );
  if (results.affectedRows > 0) {
    return results;
  } else {
    return null;
  }
};
