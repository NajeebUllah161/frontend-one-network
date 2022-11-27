import { createReducer } from "@reduxjs/toolkit";

export const authReducer = createReducer({}, {
    //register user
    signupRequest: (state) => {
        state.loading = true;
    },
    signupSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload.user;
        state.message = action.payload.message;
    },
    signupFailure: (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload.message;
    },
    clearSignupData: (state) => {
        state.data = null;
    },
    clearSignupError: (state) => {
        state.error = null;
    },
    clearSignupMessage: (state) => {
        state.message = null;
    },

    //login user
    loginRequest: (state) => {
        state.loading = true;
    },
    loginSuccess: (state, action) => {
        state.loading = false;
        state.data = action.payload.user;
        state.isAuthenticated = true;
        state.message = action.payload.message;
    },
    loginFailure: (state, action) => {
        state.loading = false;
        state.error = true;
        state.isAuthenticated = false;
        state.message = action.payload.message;
    },
    clearLoginData: (state) => {
        state.data = null;
    },
    clearLoginError: (state) => {
        state.error = null;
    },
    clearLoginMessage: (state) => {
        state.message = null;
    },

    //load user
    loadUserRequest: (state) => {
        state.loading = true;
    },
    loadUserSuccess: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.data = action.payload.user;
    },
    loadUserFailure: (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.error = action.payload;
    },

    //logout user
    logoutRequest: (state) => {
        state.loading = true;
    },
    logoutSuccess: (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
    },
    logoutFailure: (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.error = action.payload;
    },
})