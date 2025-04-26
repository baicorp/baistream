import React, { useEffect, useRef } from "react";
import useVideoPlayer from "../hooks/usePlayer";

export default function VideoPlayer({
  className,
}: {
  className?: React.HTMLAttributes<HTMLVideoElement>["className"];
}) {
  const { currentPlay } = useVideoPlayer();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.key === " ") {
        // target space button
        e.preventDefault();
        if (video.paused) {
          await video.play();
        } else {
          video.pause();
        }
      }

      if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          await video.requestFullscreen();
        }
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        video.currentTime = Math.max(0, video.currentTime - 10); // go back 10s
      }

      if (e.key === "ArrowRight") {
        e.preventDefault();
        video.currentTime = Math.min(video.duration, video.currentTime + 10); // forward 10s
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      className={`aspect-video w-full ${className}`}
      src={currentPlay.currentVideo.src}
    >
      Your browser does not support the video tag.
      <track src={currentPlay.currentSubtitle.src} kind="subtitles" default />
    </video>
  );
}
