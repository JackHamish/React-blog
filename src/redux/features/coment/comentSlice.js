import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../../utils/axios";

const initialState = {
    coments: [],
    loading: false,
};

export const createComent = createAsyncThunk("coment/createComent", async ({ postId, coment }) => {
    try {
        const { data } = await axios.post(`/coments/${postId}`, { postId, coment });

        return data;
    } catch (error) {
        console.log(error);
    }
});

export const getPostComments = createAsyncThunk("coment/getPostComments", async (postId) => {
    try {
        const { data } = await axios.get(`posts/coments/${postId}`);

        return data;
    } catch (error) {
        console.log(error);
    }
});

export const comentSlice = createSlice({
    name: "coment",
    initialState,
    reducers: {},
    extraReducers: {
        [createComent.pending]: (state) => {
            state.loading = true;
        },
        [createComent.fulfilled]: (state, action) => {
            state.loading = false;
            if (!action.payload?.message) {
                state.coments.push(action.payload);
            }
        },
        [createComent.rejected]: (state) => {
            state.loading = false;
        },

        [getPostComments.pending]: (state) => {
            state.loading = true;
        },
        [getPostComments.fulfilled]: (state, action) => {
            state.loading = false;
            if (!action.payload?.message) {
                state.coments = action.payload;
            }
        },
        [getPostComments.rejected]: (state) => {
            state.loading = false;
        },
    },
});

// eslint-disable-next-line
export const {} = comentSlice.actions;

export default comentSlice.reducer;
