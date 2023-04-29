import RecipeCard from '../components/recipeCard.jsx';
const { createSlice } = require('@reduxjs/toolkit');
const React = require('react');

// Create a new slice for the modal
const modalSlice = createSlice({
    name: 'modal',
// Initial state as an object
    initialState: {
        urlScrape: {},
        keywordResults: [],
    },

    // *Updated reducers and added tempState
    // These reducers, or functions, will take the action & old state, 
    // then update the state
    reducers: {
        /**
        * Updates urlScrape with recipe data from the backend 
        *
        * @param {Object} state The state object for our app.
        * @param {Object} param The object full of data of each food and its ingredient
        */
        setUrlResult: (state, param) => {
            const { payload } = param;
            const tempState = state
            tempState.urlScrape = Object.assign(payload, state.urlScrape);
        },

        /**
        * Resets urlScrape state
        *
        * @param {Object} state The state object for our app.
        */
        clearUrlResult: (state) => {
            const tempState = state
            tempState.urlScrape = {};
        },
        /**
        * Assigning keyword state the collection of cards shown when searched
        *
        * @param {Object} state The state object for our app.
        * @param {Object} param The object full of data of each food and its ingredient
        */
        setKeywordResult: (state, param) => {
            const { payload } = param;
            const tempState = state
            tempState.keywordResults = [...state.keywordResults, ...payload]
        },
        /**
        * Clears keyword state
        *
        * @param {Object} state The state object for our app.
        */
        clearKeywordResult: (state) => {
            const tempState = state
            tempState.keywordResults = [];
        },
    }
})

const { actions, reducer } = modalSlice;
export const { setKeywordResult, setUrlResult, clearKeywordResult, clearUrlResult } = actions;
export default reducer