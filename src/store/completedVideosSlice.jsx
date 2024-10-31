import { createSlice } from '@reduxjs/toolkit';

// 初期化時にローカルストレージから完了した動画リストを読み込む
const savedCompletedVideos = JSON.parse(localStorage.getItem('completedVideos')) || [];

const completedVideosSlice = createSlice({
  name: 'completedVideos',
  initialState: savedCompletedVideos,
  reducers: {
    markVideoAsCompleted: (state, action) => {
      const videoId = action.payload;
      if (!state.includes(videoId)) {
        state.push(videoId);
        localStorage.setItem('completedVideos', JSON.stringify(state)); // ローカルストレージに保存
      }
    },
  },
});

export const { markVideoAsCompleted } = completedVideosSlice.actions;
export default completedVideosSlice.reducer;
