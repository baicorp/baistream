import { forwardRef, useEffect, useState } from "react";

const ProgessTime = forwardRef<HTMLVideoElement, {}>((_, ref) => {
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
    <div className="flex items-center gap-2 mb-4">
      <input
        className="grow"
        disabled={!videoElement.current?.duration}
        type="range"
        min={0}
        max={videoElement.current?.duration || 0}
        value={currentTime}
        onChange={(e) => {
          e.stopPropagation();
          const video = videoElement.current;
          if (!video) return;
          video.currentTime = parseFloat(e.currentTarget.value);
          setCurrentTime(parseFloat(e.currentTarget.value));
        }}
      />
    </div>
  );
});

export default ProgessTime;
