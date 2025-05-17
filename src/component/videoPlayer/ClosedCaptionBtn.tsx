import { forwardRef, useEffect, useState } from "react";
import { ClosedCaption, ClosedCaptionOff } from "../svg";

const ClosedCaptionButton = forwardRef<HTMLVideoElement, {}>((_, ref) => {
  const videoElement = ref as React.RefObject<HTMLVideoElement>;
  const [isCaptionShown, setIsCaptionShown] = useState(true);

  const handleCaption = () => {
    const video = videoElement.current;
    if (!video) return;
    let videoTrackMode = video.textTracks[0].mode;
    if (videoTrackMode === "showing") {
      video.textTracks[0].mode = "disabled";
    } else if (videoTrackMode === "disabled") {
      video.textTracks[0].mode = "showing";
    }
    setIsCaptionShown((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case "c":
          handleCaption();
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
    <button onClick={handleCaption}>
      {isCaptionShown ? <ClosedCaption /> : <ClosedCaptionOff />}
    </button>
  );
});

export default ClosedCaptionButton;
