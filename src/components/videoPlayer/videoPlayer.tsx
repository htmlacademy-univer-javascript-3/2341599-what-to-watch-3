import { useEffect, useRef } from 'react';

type VideoPlayerProps = {
  videoSrc: string;
  poster: string;
  isActive: boolean;
}

export default function VideoPlayer({videoSrc, poster, isActive}:VideoPlayerProps):JSX.Element{
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const videoPlayer = videoPlayerRef.current;
    if (videoPlayer && isActive) {
      timerRef.current = setTimeout(() => {
        videoPlayer.src = videoSrc;
      }, 1000);
    } else if (videoPlayer && !isActive){
      videoPlayer.src = '';
    }
    return () => clearTimeout(timerRef.current as NodeJS.Timeout);
  }, [videoSrc, isActive]);
  return (
    <video src={''} ref={videoPlayerRef} poster={poster} autoPlay muted className="player__video"></video>
  );
}
