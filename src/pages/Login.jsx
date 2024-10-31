import { useState } from 'react';
import { useDispatch } from 'react-redux'; // Reduxのdispatchをインポート
import { useNavigate } from 'react-router-dom';
import { login } from '../store/authSlice';

function Login() {
  const dispatch = useDispatch();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // IDとパスワードが正しいかをチェック
    if (id === 'admin' && password === 'password') {
      dispatch(login()); // ログイン状態を更新する
      navigate('/videos'); // 動画ページへ移動
    } else {
      alert('IDまたはパスワードが間違っています');
    }
  };

  return (
    <div>
      <h2>ログイン画面</h2>
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>ログイン</button>
    </div>
  );
}

export default Login;
