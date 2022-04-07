import {createSlice} from '@reduxjs/toolkit';

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        post: null,
    },
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        searchValue: (state, action) => {
            state.post = action.payload
        },
        nullValue: (state) => {
            state.post = null
        },

    },
});

export const {searchValue,nullValue} = postSlice.actions;

export const selectPost = (state) => state.post.post;

export default postSlice.reducer;
