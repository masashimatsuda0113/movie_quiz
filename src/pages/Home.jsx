import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async'; // Helmetのインポート
import './Home.css';

const Home = () => {
  return (
    <main className='home-main'>
      <Helmet>
        <title>ホーム - 動画研修</title>
        <meta name="description" content="研修動画のホームページです。動画を見て新しい知識を学びましょう。" />
      </Helmet>
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">動画研修</h1>
        <p className="home-description">
          さぁ、始めましょう！
        </p>
        <Link to="/videos" className="home-link">
          動画ページへ
        </Link>
      </div>
    </div>
    </main>
  );
}

export default Home;
