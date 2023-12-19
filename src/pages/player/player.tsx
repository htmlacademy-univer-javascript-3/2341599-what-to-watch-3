import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFilmInfo, getFilmInfoLoadStatus } from '../../store/film-process/selectors';
import { fetchFilmInfoAction } from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';
import PageNotFound from '../page-not-found/page-not-found';

export default function Player(): JSX.Element {
  const videoPlayer = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<HTMLProgressElement | null>(null);
  const toggler = useRef<HTMLDivElement | null>(null);
  const timeLeft = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { id } = useParams();
  const film = useAppSelector(getFilmInfo);
  const isFilmLoading = useAppSelector(getFilmInfoLoadStatus);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmInfoAction(id));
    }
  }, [dispatch, id]);

  const changePause = (): void => {
    if (isPlaying) {
      videoPlayer.current?.pause();
    } else {
      videoPlayer.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  function getTimeLeft(seconds: number): string {
    if (seconds / 3600 < 1) {
      return new Date(seconds * 1000).toISOString().slice(14, 19);
    }
    return new Date(seconds * 1000).toISOString().slice(11, 19);
  }

  const handleTimeUpdate = (): void => {
    if (
      progressRef.current &&
      videoPlayer.current &&
      film &&
      toggler.current &&
      timeLeft.current
    ) {
      const progress =
        (videoPlayer.current.currentTime / videoPlayer.current.duration) * 100;
      progressRef.current.value = progress;
      toggler.current.style.left = `${progress}%`;
      timeLeft.current.innerHTML = getTimeLeft(
        videoPlayer.current.duration - videoPlayer.current.currentTime
      );
    }
  };

  const handleFullScreen = (): void => {
    if (!isFullScreen) {
      videoPlayer.current?.requestFullscreen({ navigationUI: 'hide' });
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  if (isFilmLoading) {
    return <Spinner />;
  }

  if (!film || !id) {
    return <PageNotFound />;
  }

  return (
    <>
      <Helmet>
        <title>Player</title>
      </Helmet>
      <div className="player">
        <video src={film.videoLink} ref={videoPlayer} className="player__video" poster={film.backgroundImage} onTimeUpdate={handleTimeUpdate}></video>

        <button type="button" className="player__exit" onClick={() => navigate(-1)}>Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress ref={progressRef} className="player__progress" value="0" max="100"></progress>
              <div className="player__toggler" ref={toggler}>Toggler</div>
            </div>
            <div ref={timeLeft} className="player__time-value">{getTimeLeft(film.runTime)}</div>
          </div>

          <div className="player__controls-row">
            <button onClick={changePause} type="button" className="player__play" data-testid="videoControl">
              {isPlaying ?
                <>
                  <svg viewBox="0 0 14 21" width="14" height="21">
                    <use xlinkHref="#pause"></use>
                  </svg>
                  <span>Pause</span>
                </>
                :
                <>
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref='#play-s' href="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </>}
            </button>
            <div className="player__name">{film.name}</div>

            <button type="button" className="player__full-screen" onClick={handleFullScreen}>
              <svg viewBox="0 0 27 27" width="27" height="27">
                <use xlinkHref='#full-screen' href="#full-screen"></use>
              </svg>
              <span>Full screen</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
