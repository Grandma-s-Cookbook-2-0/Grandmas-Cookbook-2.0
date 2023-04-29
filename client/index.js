import React from 'react';
import ReactDOM from 'react-dom/client'
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import cardReducer from "./slices/cardSlice";
import modalReducer from "./slices/modalSlice"
import styles from './scss/application.scss'
import SignInSide from './containers/authGrid.jsx';
import { createBrowserRouter, RouterProvider} from "react-router-dom"
import App from './App.jsx';
 
//  Setup global store object, and register reducers we'll find elsewhere in the code.
const store = configureStore({
    // Passed in an object of slice reducers 
    reducer: { card: cardReducer, 
                modal: modalReducer }
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <SignInSide />,
    },
    {
        path: "/home",
        element: <Provider store={store}> <App /> </Provider>,
    },
])


// root: is a pointer to the top-level data structure
const root = ReactDOM.createRoot(document.getElementById('root'));
// render: defines the React component that should be rendered
root.render(
    <RouterProvider router={router} />
);


