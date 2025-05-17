import { forwardRef, useState, useEffect } from "react";
import { Pause, Play } from "../svg";

const PlayPauseButton = forwardRef<HTMLVideoElement, {}>((_, ref) => {
  const videoElement = ref as React.RefObject<HTMLVideoElement>;
  const [isPlayed, setIsPlayed] = useState(false);

  const handlePlayPause = async (e: React.MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
    if (!videoElement.current) return;
    if (videoElement.current.paused) {
      await videoElement.current.play();
    } else {
      videoElement.current.pause();
    }
  };
  async function handlePlayState() {
    if (!videoElement.current) return;
    setIsPlayed(true);
  }
  function handlePauseState() {
    if (!videoElement.current) return;
    setIsPlayed(false);
  }
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key.toLowerCase()) {
      case " ":
        handlePlayPause(e);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!videoElement.current) return;

    window.addEventListener("keydown", handleKeyDown);
    videoElement.current?.addEventListener("play", handlePlayState);
    videoElement.current?.addEventListener("pause", handlePauseState);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      videoElement.current?.removeEventListener("play", handlePlayState);
      videoElement.current?.removeEventListener("pause", handlePauseState);
    };
  }, [videoElement.current]);

  return (
    <button
      className="bg-secondary px-8 py-2.5 rounded-full"
      onClick={handlePlayPause}
    >
      {isPlayed ? <Pause /> : <Play />}
    </button>
  );
});

export default PlayPauseButton;
