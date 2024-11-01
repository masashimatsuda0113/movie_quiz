import { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // useSelectorだけをインポート
import Home from './pages/Home';
import VideoPage from './pages/VideoPage';
import { HelmetProvider } from 'react-helmet-async'; // HelmetProviderのインポート
import Login from './pages/Login';
import CongratulationsPage from './pages/CongratulationsPage'; // おめでとうページのインポート

function App() {
  // ログイン状態をストアから読み込む
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // 初回レンダリング時に右クリック無効化
  useEffect(() => {
    const disableContextMenu = (event) => event.preventDefault();
    document.addEventListener("contextmenu", disableContextMenu);
    
    // クリーンアップ: コンポーネントがアンマウントされたときにイベントリスナーを解除
    return () => document.removeEventListener("contextmenu", disableContextMenu);
  }, []);

  return (
    <HelmetProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
      <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
      <Route path="/videos" element={isAuthenticated ? <VideoPage /> : <Navigate to="/login" />} />
        <Route path="/congratulations" element={isAuthenticated ? <CongratulationsPage /> : <Navigate to="/login" />} />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
