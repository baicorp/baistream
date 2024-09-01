import React from "react";
import useVideoPlayer from "../hooks/usePlayer";

export default function VideoPlayer({
  className,
}: {
  className?: React.HTMLAttributes<HTMLVideoElement>["className"];
}) {
  const { currentPlay } = useVideoPlayer();
  return (
    <video
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
