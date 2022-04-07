import {createSlice} from '@reduxjs/toolkit';

export const postPhotoSlice = createSlice({
    name: 'postPhoto',
    initialState: {
        postPhoto: null,
    },
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        photoValue: (state, action) => {
            state.postPhoto = action.payload
        },
        nullValue: (state) => {
            state.postPhoto = null
        },

    },
});

export const {photoValue,nullValue} = postPhotoSlice.actions;

export const selectPostPhoto= (state) => state.postPhoto.postPhoto;

export default postPhotoSlice.reducer;
