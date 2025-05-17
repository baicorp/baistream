import { forwardRef, useEffect } from "react";
import { Forward, FullScreen, Replay, SkipNext, SkipPrev } from "../svg";
import ProgessTime from "./ProgressTime";
import VolumeSlider from "./VolumeSlider";
import ClosedCaptionButton from "./ClosedCaptionBtn";
import PictureInPictureButton from "./PictureInPictureBtn";
import PlayPauseButton from "./PlayPauseBtn";
import TimeDisplay from "./TimeDisplay";

const BottomBarControls = forwardRef<HTMLVideoElement, {}>((_, ref) => {
  const videoElement = ref as React.RefObject<HTMLVideoElement>;

  const handleForward = (e: React.MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
    const video = videoElement.current;
    if (!video) return;
    const newTime = video.currentTime + 10;
    if (newTime > video.duration) {
      video.currentTime = video.duration;
    }
    video.currentTime = newTime;
  };
  const handleReplay = (e: React.MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
    const video = videoElement.current;
    if (!video) return;
    const newTime = video.currentTime - 10;
    if (newTime < 0) {
      video.currentTime = 0;
    }
    video.currentTime = newTime;
  };
  const handleFullScreen = async (e: React.MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
    if (!videoElement.current) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await videoElement.current.requestFullscreen();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      e.stopPropagation();
      switch (e.key.toLowerCase()) {
        case "f":
          handleFullScreen(e);
          break;
        case "arrowright":
          handleForward(e);
          break;
        case "arrowleft":
          handleReplay(e);
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col gap-1 px-4 pb-7">
      <ProgessTime ref={ref} />
      <div className="flex items-center gap-4">
        <PlayPauseButton ref={videoElement} />
        <div className="px-4 py-2.5 rounded-md bg-primary/30 backdrop-blur-sm flex items-center gap-5">
          <TimeDisplay ref={videoElement} />
          <button>
            <SkipPrev />
          </button>
          <button>
            <SkipNext />
          </button>
          <button onClick={handleReplay}>
            <Replay />
          </button>
          <button onClick={handleForward}>
            <Forward />
          </button>
        </div>
        <div className="ml-auto px-4 py-2.5 rounded-md bg-primary/30 backdrop-blur-sm flex items-center gap-5">
          <VolumeSlider ref={videoElement} />
          <ClosedCaptionButton ref={videoElement} />
          <PictureInPictureButton ref={videoElement} />
          <button onClick={handleFullScreen}>
            <FullScreen />
          </button>
        </div>
      </div>
    </div>
  );
});

export default BottomBarControls;
