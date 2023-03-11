import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth/authSlice";
import postSlice from "./features/post/postSlice";
import comentSlice from "./features/coment/comentSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice,
        post: postSlice,
        coment: comentSlice,
    },
});
