import { forwardRef, useEffect, useState } from "react";
import { Volume, VolumeMute } from "../svg";

const VolumeSlider = forwardRef<HTMLVideoElement, {}>((_, ref) => {
  const videoRef = ref as React.RefObject<HTMLVideoElement>;
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const handleMute = (e: React.MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    if (video.volume === 0) {
      video.volume = volume;
      setIsMuted(false);
      return;
    }
    video.volume = 0;
    setIsMuted(true);
  };
  const volumeKey = (e: KeyboardEvent, key: "arrowdown" | "arrowup") => {
    const video = videoRef.current;
    if (!video) return;
    if (isMuted) {
      handleMute(e);
      return;
    }
    let newVolume: number;
    if (key === "arrowdown") {
      newVolume = Math.max(parseFloat((video.volume - 0.1).toFixed(2)), 0);
    } else if (key === "arrowup") {
      newVolume = Math.min(parseFloat((video.volume + 0.1).toFixed(2)), 1);
    } else {
      newVolume = 1;
    }
    setVolume(newVolume);
    video.volume = newVolume;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case "m":
          handleMute(e);
          break;
        case "arrowup":
          volumeKey(e, "arrowup");
          break;
        case "arrowdown":
          volumeKey(e, "arrowdown");
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMuted]);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleMute(e);
        }}
      >
        {isMuted || volume === 0 ? <VolumeMute /> : <Volume />}
      </button>
      <input
        className="max-w-14"
        type="range"
        min={0}
        max={1}
        step={0.1}
        value={isMuted ? 0 : volume}
        onChange={(e) => {
          e.stopPropagation();
          const video = videoRef.current;
          if (!video) return;
          video.volume = parseFloat(e.currentTarget.value);
          setVolume(video.volume);
        }}
      />
    </div>
  );
});

export default VolumeSlider;
