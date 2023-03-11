import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
};

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async ({ username, password }) => {
        try {
            const { data } = await axios.post("/auth/register", {
                username,
                password,
            });

            if (data.token) {
                localStorage.setItem("token", JSON.stringify(data.token));
            }

            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

export const loginUser = createAsyncThunk("auth/loginUser", async ({ username, password }) => {
    try {
        const { data } = await axios.post("/auth/login", {
            username,
            password,
        });

        if (data.token) {
            localStorage.setItem("token", JSON.stringify(data.token));
        }

        return data;
    } catch (error) {
        console.log(error);
    }
});

export const getMe = createAsyncThunk("auth/getMe", async () => {
    try {
        const { data } = await axios.post("/auth/me");

        return data;
    } catch (error) {
        console.log(error);
    }
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut: (state) => {
            state.user = null;
            state.token = null;
            state.isLoading = false;
            state.status = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.status = null;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload?.message;
            state.user = action.payload.user;
            state.token = action.payload.token;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message;
        });

        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.status = null;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload?.message;
            state.user = action.payload.user;
            state.token = action.payload.token;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message;
        });

        builder.addCase(getMe.pending, (state) => {
            state.isLoading = true;
            state.status = null;
        });
        builder.addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = null;
            state.user = action.payload?.user;
            state.token = action.payload?.token;
        });
        builder.addCase(getMe.rejected, (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message;
        });
    },
});

export const { logOut } = authSlice.actions;

export const SelectAuth = (state) => state.auth;
export const checkIsAuth = (state) => Boolean(state.auth.token);

export default authSlice.reducer;
