'use client'
import { RootState } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const getUserFromLocalStorage = () => {
    let user = null;

    if (typeof localStorage !== 'undefined') {
        const isUserExist = localStorage.getItem('user');
        if (isUserExist !== null) {
            try {
                user = JSON.parse(isUserExist);
            } catch (error) {
                console.error('Error parsing user data from localStorage:', error);
            }
        }
    }
    return user;
};

const initialState = {
    user: getUserFromLocalStorage(),
    token: null
}

const user = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, accessToken } = action.payload
            state.user = user
            state.token = accessToken
            localStorage.setItem('user', JSON.stringify(user));
        },

        logout: (state) => {
            state.user = null,
            state.token = null;
            localStorage.removeItem('user');
        },

        setInitialState: () => {

        }
    }
})

export const { setCredentials, logout } = user.actions;
export default user.reducer

export const getUser = () => useSelector((state: RootState) => state.user.user);