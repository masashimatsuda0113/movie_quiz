// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import watchedVideosReducer from './watchedVideosSlice';
import completedVideosReducer from './completedVideosSlice';
// ストアを作る
const store = configureStore({
  reducer: {
    auth: authReducer, // authSliceをストアの中に入れる
    watchedVideos: watchedVideosReducer, // watchedVideosSliceをストアの中に入れる
    completedVideos: completedVideosReducer, // completedVideosSliceをストアの中に入れる
  },
});

export default store;
