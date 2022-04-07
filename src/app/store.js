import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import postReducer from '../features/postSlice';
import postPhotoReducer from '../features/postPhotoSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    postPhoto: postPhotoReducer,
  },
});
