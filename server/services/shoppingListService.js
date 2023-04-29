const shoppingListService = {};

shoppingListService.createShoppingList = (ingredientLists, quantities) => {
  /* 
    to-do:
      - combine quantities
      - convert to single unit of measurement where multiple are present
      - remove preparation instructions
  */

  const shoppingList = [];

  for (let i = 0; i < ingredientLists.length; i++) {
    for (let j = 0; j < quantities[i]; j++) {
      shoppingList.push(...ingredientLists[i]);
    }
  }

  return shoppingList;
}

module.exports = shoppingListService;
