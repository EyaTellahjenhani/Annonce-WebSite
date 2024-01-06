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
  updateFields, id
) => {
  const { firstName, lastName, email, phone, password } = updateFields;
  const setFields = [];
  const values = [];

  if (firstName !== undefined) {
    setFields.push(`FirstName = ?`);
    values.push(firstName);
  }
  if (lastName !== undefined) {
    setFields.push(`LastName = ?`);
    values.push(lastName);
  }
  if (email !== undefined) {
    setFields.push(`Email = ?`);
    values.push(email);
  }
  if (phone !== undefined) {
    setFields.push(`Phone = ?`);
    values.push(phone);
  }
  if (password !== undefined) {
    setFields.push(`Password = ?`);
    values.push(password);
  }

  if (setFields.length === 0) {
    // No fields to update
    return true;
  }

  const setClause = setFields.join(', ');
  const queryString = `UPDATE users SET ${setClause} WHERE UserID = ?`;
  values.push(id);

  try {
    const result = await configBd.execute(queryString, values);
    return true
  } catch (error) {
    console.error(error);
    throw error;
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
