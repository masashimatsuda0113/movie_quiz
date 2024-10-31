import { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markVideoAsWatched } from '../store/watchedVideosSlice';
import { markVideoAsCompleted } from '../store/completedVideosSlice'; // 完了スライスのインポート
import './VideoPage.css';

const VideoPage = () => {
  const videoIds = [
    { id: 'video1', url: 'https://v.ftcdn.net/05/56/24/58/700_F_556245894_CCKN7MDUfC2wSTdi3RQ0v5Jn31NNBmdA_ST.mp4' },
    { id: 'video2', url: 'https://v.ftcdn.net/03/88/90/90/240_F_388909049_Asd65upkURJUtfAXXO1PNyEL6Rsm9t9A_ST.mp4' },
    { id: 'video3', url: 'https://v.ftcdn.net/03/39/41/69/240_F_339416963_0BoUrBb3KclqocWS71cVO0slPzRLvWom_ST.mp4' }
  ];

  const quizData = {
    video1: [
      { question: "この動画のテーマは何でしたか？", options: ["海", "宇宙", "森"], answer: "海" },
      { question: "動画内で登場した動物は？", options: ["サメ", "イルカ", "クジラ"], answer: "イルカ" }
    ],
    video2: [
      { question: "この動画で紹介された動物は？", options: ["ライオン", "ペンギン", "ゾウ"], answer: "ペンギン" },
      { question: "この動物の生息地はどこ？", options: ["北極", "南極", "砂漠"], answer: "南極" }
    ],
    video3: [
      { question: "この動画で学んだことを1つ教えてください。", options: ["リサイクル", "運動", "睡眠"], answer: "リサイクル" },
      { question: "この動画で登場したエコ活動は？", options: ["植林", "プラスチック削減", "水の節約"], answer: "プラスチック削減" }
    ]
  };

  const dispatch = useDispatch();
  const watchedVideos = useSelector((state) => state.watchedVideos);
  const completedVideos = useSelector((state) => state.completedVideos); // 完了状態の取得
  const videoRefs = useRef({});
  const [videoStates, setVideoStates] = useState({});
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuizData, setCurrentQuizData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openVideo, setOpenVideo] = useState(null); 
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null); // 現在の動画IDを保存

  const handlePlayPause = (videoId) => {
    const video = videoRefs.current[videoId];
    if (video.paused) {
      video.play();
      setVideoStates((prevStates) => ({ ...prevStates, [videoId]: true }));
    } else {
      video.pause();
      setVideoStates((prevStates) => ({ ...prevStates, [videoId]: false }));
    }
  };

  const handleVideoEnd = (videoId) => {
    dispatch(markVideoAsWatched(videoId));
    setVideoStates((prevStates) => ({ ...prevStates, [videoId]: false }));
    startQuiz(videoId); // 視聴完了時にクイズ開始
  };

  const startQuiz = (videoId) => {
    setCurrentQuizData(quizData[videoId]);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setResultMessage("");
    setIsModalOpen(true);
    setIsIncorrect(false); // クイズ開始時に不正解状態をリセット
    setCurrentVideoId(videoId); // 現在の動画IDを保存
  };

  const handleAnswerSelect = (answer, videoId) => {
    setSelectedAnswer(answer);
    if (answer === currentQuizData[currentQuizIndex].answer) {
      setResultMessage("正解です！");
      setIsIncorrect(false); // 正解のときは不正解状態を解除
      if (currentQuizIndex < currentQuizData.length - 1) {
        setTimeout(() => {
          setCurrentQuizIndex(currentQuizIndex + 1);
          setSelectedAnswer(null);
          setResultMessage("");
        }, 1000);
      } else {
        setResultMessage("すべてのクイズが完了しました！");
        // 完了した動画にマークを追加
        dispatch(markVideoAsCompleted(videoId)); // 動画のIDを渡して完了マークをリダックスに記録
        setTimeout(() => {
          setIsModalOpen(false);
        }, 2000);
      }
    } else {
      setResultMessage("不正解です。最初からやり直してください。");
      setIsIncorrect(true); // 不正解のときにフラグを立てる
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setResultMessage("");
    setIsIncorrect(false); // リセット時に不正解状態を解除
  };

  return (
    <div>
      <h1 className='page-title'>Videos</h1>
      {videoIds.map((video) => (
        <div className='video-container' key={video.id}>
          <h3 className='video-title' onClick={() => setOpenVideo(openVideo === video.id ? null : video.id)} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
            <span>{video.id}</span> <span>{openVideo === video.id ? "▲" : "▼"}</span>
            {watchedVideos.includes(video.id) && <span className='watched-icon'>✅ Watched</span>}
            {completedVideos.includes(video.id) && <span className='complete-icon'>🎉 Complete</span>}
          </h3>
          
          <div className={`accordion-content ${openVideo === video.id ? 'open' : ''}`}>
            {openVideo === video.id && (
              <div className='video-content'>
                <video
                  ref={(ref) => videoRefs.current[video.id] = ref}
                  src={video.url}
                  onEnded={() => handleVideoEnd(video.id)}
                />
                <button onClick={() => handlePlayPause(video.id)}>
                  {videoStates[video.id] ? "⏸ Pause" : "▶️ Play"}
                </button>
                {watchedVideos.includes(video.id) && (
                    <button onClick={() => startQuiz(video.id)} className="quiz-button" style={{ marginLeft: '10px' }}>
                      クイズへ挑戦
                    </button>
                )}
              </div>
            )}
          </div>
        </div>
      ))}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>クイズ</h2>
            <p>{currentQuizData[currentQuizIndex].question}</p>

            {!isIncorrect && currentQuizData[currentQuizIndex].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerSelect(option, currentVideoId)} className="quiz-button">
                {option}
              </button>
            ))}

            {selectedAnswer && <p>あなたの回答: {selectedAnswer}</p>}
            {resultMessage && <p>{resultMessage}</p>}

            {isIncorrect && (
              <button onClick={handleRestartQuiz} className="quiz-button" style={{ marginTop: "10px" }}>
                最初からやり直す
              </button>
            )}

            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{
                  width: `${((currentQuizIndex + 1) / currentQuizData.length) * 100}%`
                }}
              ></div>
            </div>
            <p>{currentQuizIndex + 1} / {currentQuizData.length} クイズ完了</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPage;
