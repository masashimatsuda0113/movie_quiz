import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux'; // Providerをインポート
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.jsx';
import store from './store/store'; // ストアをインポート
import './styles/styles.scss'; // SCSS ファイルをインポート

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}> {/* ReduxのProviderで全体を包む */}
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>,
);
