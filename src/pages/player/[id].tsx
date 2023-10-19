import { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';

type PlayerProps = {
  video: string;
};

export default function Player({video}:PlayerProps): JSX.Element{
  const videoPlayer = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const changePause = (): void=>{
    if (isPlaying && videoPlayer.current !== null){
      setIsPlaying(false);
      videoPlayer.current.pause();
    }
    else if(videoPlayer.current !== null){
      setIsPlaying(false);
      videoPlayer.current.play();
    }
  };

  return (
    <>
      <Helmet>
        <title>Player</title>
      </Helmet>
      <div className="player">
        <video src={video} ref={videoPlayer} className="player__video" poster="img/player-poster.jpg"></video>

        <button type="button" className="player__exit">Exit</button>

        <div className="player__controls">
          <div className="player__controls-row">
            <div className="player__time">
              <progress className="player__progress" value="30" max="100"></progress>
              <div className="player__toggler" style={{left: '30%'}}>Toggler</div>
            </div>
            <div className="player__time-value">1:30:29</div>
          </div>

          <div className="player__controls-row">
            <button onClick={changePause} type="button" className="player__play">
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref='#play-s' href="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
            <div className="player__name">Transpotting</div>

            <button type="button" className="player__full-screen">
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
