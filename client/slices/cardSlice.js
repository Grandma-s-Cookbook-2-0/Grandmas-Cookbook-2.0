const { createSlice } = require('@reduxjs/toolkit');

// create a new slice for card
const cardSlice = createSlice({
 name: 'card',

 // initial state as an object
 initialState: {
   recipes: [],
 },

   // these reducers, or functions, will take the action & old state, then update the state
   reducers: {
       // initialize state passing in all of the recipes in database 
       init: (state, param) => {
           const { payload } = param;
           const tempState = state;
           tempState.recipes = [...state.recipes, ...payload];
       },
       // adds a recipe to the copy of state
       addCard: (state, param) => {
           const { payload } = param;
           const tempState = state;
           tempState.recipes = [...state.recipes, payload]
       },
       // iterates over recipes in state to find and return already updated recipe in the database. All other recipes are returned as is.
       // *returned value is used to create a new array
       updateCard: (state, param) => {
           const { payload } = param;
           const tempState = state;
           tempState.recipes = tempState.recipes.map((recipe) => {
               if (recipe.id === payload.id) return payload;
               return recipe;
           })
       },
       // returns a new recipes array, filtering out the element(s) that were deleted.
       deleteCard: (state, param) => {
           const { payload } = param;
           const tempState = state;
           tempState.recipes = tempState.recipes.filter((recipe) => recipe.id !== payload.id)
       }
   }
})


const { actions, reducer } = cardSlice;


// redux toolkit creates actions that corresponds to names of reducer functions
export const { init, addCard, updateCard, deleteCard } = actions;
export default reducer