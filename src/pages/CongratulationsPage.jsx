import React, { useEffect } from 'react';
import './Congratulations.css'; // CSSファイルをインポート
import confetti from 'canvas-confetti'; // 紙吹雪ライブラリを使用
import { Helmet } from 'react-helmet-async'; // Helmetのインポート

const Congratulations = () => {
  useEffect(() => {
    // ページ読み込み時に紙吹雪を降らせる
    confetti({
      particleCount: 200,
      spread: 70,
      origin: { y: 0.6 }
    });

    // 紙吹雪を複数回発射する
    const interval = setInterval(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { y: Math.random() }
      });
    }, 2000);

    // クリーンアップ処理
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="congratulations-container">
      <Helmet>
        <title>おめでとう - 動画研修</title>
        <meta name="description" content="研修動画のおめでとう。すべてのクイズに正解しました！本当に素晴らしいです！" />
      </Helmet>
      <h1 className="congratulations-title">🎉 Congratulations! 🎉</h1>
      <p className="congratulations-text">
        すべてのクイズに正解しました！<br />
        あなたの努力に拍手を送ります👏✨
      </p>
      <div className="firework-background"></div>
      <button
        className="celebration-button"
        onClick={() => {
          confetti({
            particleCount: 300,
            spread: 120,
            origin: { y: 0.3 }
          });
        }}
      >
        もっとお祝いする！
      </button>
    </div>
  );
};

export default Congratulations;
