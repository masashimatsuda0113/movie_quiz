import { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { markVideoAsWatched } from '../store/watchedVideosSlice';
import { markVideoAsCompleted } from '../store/completedVideosSlice';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const VideoPage = () => {
  const navigate = useNavigate();
  const videoIds = [
    { id: '動画1', url: 'https://v.ftcdn.net/05/56/24/58/700_F_556245894_CCKN7MDUfC2wSTdi3RQ0v5Jn31NNBmdA_ST.mp4' },
    { id: '動画2', url: 'https://v.ftcdn.net/03/88/90/90/240_F_388909049_Asd65upkURJUtfAXXO1PNyEL6Rsm9t9A_ST.mp4' },
    { id: '動画3', url: 'https://v.ftcdn.net/03/39/41/69/240_F_339416963_0BoUrBb3KclqocWS71cVO0slPzRLvWom_ST.mp4' }
  ];

  const quizData = {
    '動画1': [
      { question: "登場人物の性別は？", options: ["男性", "女性", "どちらでもない"], answer: "男性" },
      { question: "登場人物の行動は？", options: ["ネクタイを脱いだ", "靴を脱いだ", "ジャケットを脱いだ"], answer: "ジャケットを脱いだ" },
      { question: "動画に出てきた乗り物は？", options: ["車", "バイク", "自転車"], answer: "自転車" }
    ],
    '動画2': [
      { question: "最初の段階で車の窓の状態は？", options: ["少し開いている", "閉じている", "全開"], answer: "全開" },
      { question: "運転手は。。。", options: ["白淵眼鏡をかけている", "マスクをしている", "サングラスをかけている"], answer: "サングラスをかけている" },
      { question: "途中何とすれ違った？", options: ["車", "バイク", "木"], answer: "木" }
    ],
    '動画3': [
      { question: "泳いでいたのは？", options: ["サメ", "シャチ", "イルカ"], answer: "イルカ" },
      { question: "何匹いた？", options: ["1匹", "2匹", "3匹"], answer: "2匹" }
    ]
  };

  const dispatch = useDispatch();
  const watchedVideos = useSelector((state) => state.watchedVideos);
  const completedVideos = useSelector((state) => state.completedVideos);
  const videoRefs = useRef({});
  const [videoStates, setVideoStates] = useState({});
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuizData, setCurrentQuizData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openVideo, setOpenVideo] = useState(null); 
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [currentVideoId, setCurrentVideoId] = useState(null);
  const [isHideChoices, setIsHideChoices] = useState(false);

  useEffect(() => {
    if (completedVideos.length === videoIds.length) {
      navigate('/congratulations');
    }
  }, [completedVideos, navigate, videoIds.length]);

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
    startQuiz(videoId);
  };

  const startQuiz = (videoId) => {
    setCurrentQuizData(quizData[videoId]);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setResultMessage("");
    setIsModalOpen(true);
    setIsIncorrect(false);
    setCurrentVideoId(videoId);
    setIsHideChoices(false);
  };

  const handleAnswerSelect = (answer, videoId) => {
    if (!currentQuizData || currentQuizIndex >= currentQuizData.length) {
      return; // クイズデータがないか、インデックスが範囲外の場合は何もしない
    }

    setSelectedAnswer(answer);
    if (answer === currentQuizData[currentQuizIndex].answer) {
      setResultMessage("正解です！");
      setIsIncorrect(false);
      setIsHideChoices(true);
      if (currentQuizIndex < currentQuizData.length - 1) {
        setTimeout(() => {
          setCurrentQuizIndex(currentQuizIndex + 1);
          setSelectedAnswer(null);
          setResultMessage("");
          setIsHideChoices(false);
        }, 2000);
      } else {
        setResultMessage("すべてのクイズが完了しました！");
        setCurrentQuizIndex(currentQuizData.length);
        dispatch(markVideoAsCompleted(videoId));
        setTimeout(() => {
          setIsModalOpen(false);
        }, 3000);
      }
    } else {
      setResultMessage("不正解です。最初からやり直してください。");
      setIsIncorrect(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setResultMessage("");
    setIsIncorrect(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentQuizData(null);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setResultMessage("");
    setIsIncorrect(false);
    setCurrentVideoId(null);
  };

  return (
    <main className='video-page'>
      <Helmet>
        <title>動画ページ - 動画研修</title>
        <meta name="description" content="研修動画のページです。動画を見て新しい知識を学びましょう。" />
      </Helmet>
      <h1 className='page-title'>研修動画</h1>
      {videoIds.map((video) => (
        <div className='video-container' key={video.id}>
          <h3 className='video-title' onClick={() => setOpenVideo(openVideo === video.id ? null : video.id)}>
            <span>{video.id}</span> <span className='accordion-icon'>{openVideo === video.id ? "▲" : "▼"}</span>
            {watchedVideos.includes(video.id) && <span className='watched-icon'>✅ 見たよ！</span>}
            {completedVideos.includes(video.id) && <span className='complete-icon'>🎉 問題クリア！</span>}
          </h3>
          
          <div className={`accordion-content ${openVideo === video.id ? 'open' : ''}`}>
            {openVideo === video.id && (
              <div className='video-content'>
                <video
                  ref={(ref) => videoRefs.current[video.id] = ref}
                  src={video.url}
                  onEnded={() => handleVideoEnd(video.id)}
                />
                <button className='play-pause-button' onClick={() => handlePlayPause(video.id)}>
                  {videoStates[video.id] ? "⏸ Pause" : "▶️ Play"}
                </button>
                {watchedVideos.includes(video.id) && (
                    <button onClick={() => startQuiz(video.id)} className="quiz-button">
                      クイズへ挑戦
                    </button>
                )}
              </div>
            )}
          </div>
        </div>
      ))}

      {isModalOpen && currentQuizData && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className='modal-title'>～ 問題 ～</h2>

            <p className='modal-question'>{currentQuizData[currentQuizIndex]?.question}</p>

            {!isIncorrect && !isHideChoices && currentQuizData[currentQuizIndex]?.options.map((option, index) => (
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
                  width: `${((currentQuizIndex) / currentQuizData.length) * 100}%`
                }}
              ></div>
            </div>
            <p>{currentQuizIndex} / {currentQuizData.length} クイズ完了</p>
            <button onClick={handleCloseModal} className="close-modal-button" style={{ float: 'right' }}>
              クイズをやめる
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default VideoPage;
