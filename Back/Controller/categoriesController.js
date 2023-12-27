const {
  getCategories,
  getCategoriesParId,
  insertCategories,
  deleteCategories,
  updateCategories,
} = require("../Models/categoriesModels");

exports.afficherCategories = async (req, res) => {
  try {
    const results = await getCategories();
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json("Error during login");
  }
};

exports.afficherCategoriesParId = async (req, res) => {
  try {
  const { id } = req.params;
    const results = await getCategoriesParId(id);
    if (results) {
      res.status(201).json(results);
    } else {
      res.status(404).json("No results");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Error during login");
  }
};

exports.ajouterCategories = async (req, res) => {
  try {
  const { categoryName } = req.body;
  if (categoryName) {
      const results = await insertCategories(categoryName);
      if (results) {
        res.json("Regestred successfully");
      } else {
        res.json("Failed to register");
      }
    } else {
    res.json("Please enter all fields");
  }}
  catch (err) {
    console.error(err);
    res.status(500).json("Error during login");
  }
};

exports.modifierCategories = async (req, res) => {
  const { categoryName } = req.body;
  const { id } = req.params;
  if (categoryName) {
    try {
      const results = await updateCategories(categoryName, id);
      if (results) {
        res.json("Modified successfully");
      } else {
        res.json("Failed to modified");
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Error during login");
    }
  } else {
    res.json("Please enter all fields");
  }
};

exports.supprimerCategories = async (req, res) => {
  try {
  const { id } = req.params;
    const results = await deleteCategories(id);
    if (results) {
      res.json("Deleted successfully");
    } else {
      res.json("Failed to delete");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Error during login");
  }
};
