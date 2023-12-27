const configBd = require("./configDb");
exports.getCategories = async () => {
  const [results] = await configBd.execute("SELECT * FROM categories");
  if (results.length > 0) {
    return results;
  } else {
    return null;
  }
};

exports.getCategoriesParId = async (id) => {
  const [results] = await configBd.execute(
    "SELECT * FROM categories WHERE CategoryID =?",
    [id]
  );
  if (results.length > 0) {
    return results;
  } else {
    return null;
  }
};

exports.insertCategories = async (name) => {
  const [results] = await configBd.execute(
    "INSERT INTO categories (CategoryName) VALUES (?) ",
    [name]
  );
  if (results.affectedRows > 0) {
    return results;
  } else {
    return null;
  }
};

exports.updateCategories = async (name, id) => {
  const [results] = await configBd.execute(
    "UPDATE categories SET CategoryName=? WHERE CategoryID =?",
    [name, id]
  );
  if (results.affectedRows > 0) {
    return results;
  } else {
    return null;
  }
};

exports.deleteCategories = async (id) => {
  const [results] = await configBd.execute(
    "DELETE FROM categories WHERE CategoryID =?",
    [id]
  );
  if (results.affectedRows > 0) {
    return results;
  } else {
    return null;
  }
};
