const { createSlice } = require('@reduxjs/toolkit');

// Create a new slice for card
const cardSlice = createSlice({
 name: 'card',

 // Initial state as an object
 initialState: {
   recipes: [],
 },

   // These reducers, or functions, will take the action & old state, then update the state
   reducers: {
        /**
        * Initialize state passing in all of the recipes in database 
        *
        * @param {Object} state The state object for our app.
        * @param {Object} param The object full of data of each food and its ingredient
        */
       init: (state, param) => {
           const { payload } = param;
           const tempState = state;
           tempState.recipes = [...state.recipes, ...payload];
       },
         /**
        * Adds a recipe to the copy of state
        *
        * @param {Object} state The state object for our app.
        * @param {Object} param The object full of data of each food and its ingredient
        */
       addCard: (state, param) => {
           const { payload } = param;
           const tempState = state;
           tempState.recipes = [...state.recipes, payload]
       },
        /**
        * Iterates over recipes in state to find and return already updated recipe in the database. 
        * All other recipes are returned as is.Returned value is used to create a new array
        *
        * @param {Object} state The state object for our app.
        * @param {Object} param The object full of data of each food and its ingredient
        */
       updateCard: (state, param) => {
           const { payload } = param;
           const tempState = state;
           tempState.recipes = tempState.recipes.map((recipe) => {
               if (recipe.id === payload.id) return payload;
               return recipe;
           })
       },
       /**
       * Previous comment for team to review: Returns a new recipes array, filtering out the element(s) that were deleted.
       * Filters out the element(s) that were deleted from the database in the recipes array
       *
       * @param {Object} state The state object for our app.
       * @param {Object} param The object full of data of each food and its ingredient
       */
       deleteCard: (state, param) => {
           const { payload } = param;
           const tempState = state;
           tempState.recipes = tempState.recipes.filter((recipe) => recipe.id !== payload.id)
       }
   }
})



const { actions, reducer } = cardSlice;

// Redux toolkit creates actions that corresponds to names of reducer functions
export const { init, addCard, updateCard, deleteCard } = actions;
export default reducer