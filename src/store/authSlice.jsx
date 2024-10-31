// src/store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// 初めてアプリを開いたときに「ログインしているかどうか」を確認する
const initialAuthState = localStorage.getItem('isAuthenticated') === 'true';

const authSlice = createSlice({
  name: 'auth', // この箱の名前
  initialState: {
    isAuthenticated: initialAuthState, // ログインしているかどうかをここに入れる
  },
  reducers: {
    // ログインしたときに呼ばれる命令
    login(state) {
      state.isAuthenticated = true; // ログインしたと記録する
      localStorage.setItem('isAuthenticated', 'true'); // 保存しておく
    },
    // ログアウトしたときに呼ばれる命令
    logout(state) {
      state.isAuthenticated = false; // ログアウトしたと記録する
      localStorage.setItem('isAuthenticated', 'false'); // 保存しておく
    },
  },
});

// 他のファイルでも使えるようにする
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
