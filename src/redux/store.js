import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/userReducer";

const store = configureStore({
    reducer: { auth: authReducer }
});

export default store;

// server ="http://localhost:4000/api/v1"
export const server = "https://multicart-pk.herokuapp.com/api/v1";