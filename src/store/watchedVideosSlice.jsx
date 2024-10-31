import { createSlice } from '@reduxjs/toolkit';

// 最初にローカルストレージに保存してある視聴情報を読み込む
const savedWatchedVideos = JSON.parse(localStorage.getItem('watchedVideos')) || [];

const watchedVideosSlice = createSlice({
  name: 'watchedVideos', // 箱の名前
  initialState: savedWatchedVideos, // 箱の初期状態（保存されている情報）
  reducers: {
    // 動画を見た時に記録する関数
    markVideoAsWatched: (state, action) => {
      const videoId = action.payload; // 動画のID
      if (!state.includes(videoId)) { // まだ見たことがなければ記録する
        state.push(videoId); // 動画IDをリストに追加
        localStorage.setItem('watchedVideos', JSON.stringify(state)); // ローカルストレージにも保存
      }
    },
  },
});

export const { markVideoAsWatched } = watchedVideosSlice.actions;
export default watchedVideosSlice.reducer;
