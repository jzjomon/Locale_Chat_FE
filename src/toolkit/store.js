import { configureStore } from "@reduxjs/toolkit";
import screen from "./screenSlice"
import userReducer from './userSlice.js';
import currentUser from "./currentUser.js";
import modal from "./modal.js";


export const store = configureStore({
    reducer : {
        screen,
        userDetails : userReducer,
        currentUser,
        modal,
    }
})

