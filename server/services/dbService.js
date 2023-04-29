const db = require('../models/databaseModels');

const dbService = {};

dbService.getIngredients = async (id) => {
  const query = (`
    SELECT ingredientlist FROM recipes WHERE id = $1
  `);
  const params = [id];

  const data = await db.query(query, params);
  const ingredients = data.rows[0].ingredientlist;
  return ingredients;
};

module.exports = dbService;
