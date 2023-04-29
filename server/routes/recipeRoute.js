const router = require('express').Router();
const scrapingController = require('../controller/scrapingController');
const databaseController = require('../controller/databaseController');
const dalleImageController = require('../controller/dalleImageController');
const shoppingListController = require('../controller/shoppingListController');

// Scrape info for a specific URL provided
router.get('/scrapeurl', scrapingController, (req, res, next) => {
  res.status(200).json(res.locals);
});

// Get all recipes stored in the database
router.get('/all', databaseController.getAllRecipes, (req, res, next) => {
  res.status(200).json(res.locals);
});

// Add a new recipe to the database
router.post(
  '/add',
  dalleImageController.getImageUrl,
  databaseController.addRecipe,
  (req, res, next) => {
    res.status(200).json(res.locals);
  }
);

// Update a recipe (except image) with a specific id in the database. The request shall have the recipe id in url parameter and all other information (except imagePath) in the request body.
router.put('/update/:id', databaseController.updateRecipe, (req, res, next) => {
  res.status(200).json(res.locals);
});

// Update a recipe image with a specific id in the database. The request shall have the recipe id in url parameter and recipe title in the body.
router.put(
  '/update/image/:id',
  dalleImageController.getImageUrl,
  databaseController.updateImage,
  (req, res, next) => {
    res.status(200).json(res.locals);
  }
);

// Delete the recipe with a specific id in the database
router.delete(
  '/delete/:id',
  databaseController.deleteRecipe,
  (req, res, next) => {
    res.status(200).json('The recipe has been successfully deleted.');
  }
);

router.get('/userrecipe/:id', databaseController.getUserRecipe, (req, res) => {
  res.status(200).json(res.locals);
})

router.get('/shoppinglist', shoppingListController.getShoppingList,  (req, res) => {
  res.status(200).json(res.locals.shoppingList);
})

module.exports = router;
