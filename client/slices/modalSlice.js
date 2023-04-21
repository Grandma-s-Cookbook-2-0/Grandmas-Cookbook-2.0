import RecipeCard from '../components/recipeCard.jsx'

const { createSlice } = require('@reduxjs/toolkit');
const React = require('react')


const modalSlice = createSlice({
    name: 'modal',

    initialState: {
        urlScrape: {},
        keywordResults: [],
    },

    // updated reducers and added tempState
    reducers: {
        setUrlResult: (state, param) => {
            const { payload } = param;
            const tempState = state
            tempState.urlScrape = Object.assign(payload, state.urlScrape);
        },
        clearUrlResult: (state) => {
            const tempState = state
            tempState.urlScrape = {};
        },
        setKeywordResult: (state, param) => {
            const { payload } = param;
            const tempState = state
            tempState.keywordResults = [...state.keywordResults, ...payload]
        },
        clearKeywordResult: (state) => {
            const tempState = state
            tempState.keywordResults = [];
        },
    }
})

const { actions, reducer } = modalSlice;
export const { setKeywordResult, setUrlResult, clearKeywordResult, clearUrlResult } = actions;
export default reducer