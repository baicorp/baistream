import { forwardRef, useState, useEffect } from "react";
import formatTime from "../../lib/formatTime";

const TimeDisplay = forwardRef<HTMLVideoElement, {}>((_, ref) => {
  const videoElement = ref as React.RefObject<HTMLVideoElement>;
  const [currentTime, setCurrentTime] = useState(0);

  function handleTimeUpdate() {
    if (!videoElement.current) return;
    setCurrentTime(videoElement.current.currentTime);
  }

  useEffect(() => {
    const video = videoElement.current;
    if (!video) return;
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [videoElement.current]);

  return (
    <span className="text-xs text-secondary font-mono tracking-tighter">{`${formatTime(
      currentTime
    )} / ${formatTime(videoElement.current?.duration)}`}</span>
  );
});

export default TimeDisplay;
