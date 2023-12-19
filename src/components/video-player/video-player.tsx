import { useEffect, useRef } from 'react';

type VideoPlayerProps = {
  videoSrc: string;
  poster: string;
  isActive: boolean;
}

export default function VideoPlayer({videoSrc, poster, isActive}:VideoPlayerProps):JSX.Element{
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoPlayer = videoPlayerRef.current;
    const timer: NodeJS.Timeout = setTimeout(()=>{
      if (videoPlayer && isActive) {
        videoPlayer.play();
      } else if (videoPlayer && !isActive){
        videoPlayer.load();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [isActive]);
  return (
    <video data-testid="videoPlayer" src={videoSrc} ref={videoPlayerRef} poster={poster} muted className="player__video"></video>
  );
}
