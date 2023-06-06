import { createSlice } from "@reduxjs/toolkit";

export interface IUser {
    _id: string,
    name: string,
    email: string,
}

export interface UserState {
    token: string | null,
    user: IUser | null,
}

const initialState: UserState = {
    token: null,
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken: (state, action) => {
            const token = action.payload.token
            localStorage.setItem("token", token)
            state.token = token
        },
        deleteToken: (state, action) => {
            localStorage.removeItem("token")
            state.token = null;
        },
        logoutUser: (state, action) => {
            localStorage.removeItem("token")
            state.user = null;
            state.token = null
        },
        setUser: (state, action) => {
            state.user = action.payload.user;
        }
    },
});

// Action creators are generated for each case reducer function
export const { setUser, setToken, deleteToken, logoutUser } = userSlice.actions;

export default userSlice.reducer;
