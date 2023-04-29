const { getIngredients } = require('../services/dbService');
const { createShoppingList } = require('../services/shoppingListService');

const shoppingListController = {};

shoppingListController.getShoppingList = async (req, res, next) => {
  if (!req.query.recipes || !req.query.quantities) {throw new Error('recipe and quantity selection required')}

  const recipes = JSON.parse(req.query.recipes);
  const quantities = JSON.parse(req.query.quantities);

  const ingredientLists = await Promise.all(recipes.map( async (id) => getIngredients(id)));

  const shoppingList = await (createShoppingList(ingredientLists, quantities));

  console.log(shoppingList);
  res.locals.shoppingList = shoppingList;

  return next();
}

module.exports = shoppingListController;