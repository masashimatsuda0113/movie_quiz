import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';
import './Login.css'; // CSSファイルをインポート
import { Helmet } from 'react-helmet-async'; // Helmetのインポート

function Login() {
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (id === 'admin' && password === 'password') {
      dispatch(login());
      navigate('/videos');
    } else {
      alert('IDまたはパスワードが間違っています');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <main className='login-main'>
      <Helmet>
        <title>ログイン - 動画研修</title>
        <meta name="description" content="研修動画のログインページです。ログインして動画を見て新しい知識を学びましょう。" />
      </Helmet>
      <div className="login-container">
        <div className="login-card">
          <h2>ログイン</h2>
          <input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            onKeyPress={handleKeyPress} 
            className="login-input"
          />
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            className="login-input"
          />
          <button onClick={handleLogin} className="login-button">ログイン</button>
        </div>
      </div>
    </main>
  );
}

export default Login;
