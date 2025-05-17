import { useEffect, useRef, useState } from "react";
import useVideoPlayer from "../../hooks/usePlayer";
import { toast } from "sonner";
import BottomBarControls from "./BottomControls";

export default function VideoPlayer() {
  const { currentPlay } = useVideoPlayer();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isControlsVisible, setIsControlsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);

  const handleContainerClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const video = videoRef.current;
    if (!video) return;
    const controls = controlsRef.current;
    if (!controls) return;
    // Check if the mouse event target is inside the controls element
    if (controls.contains(e.target as Node)) {
      // If it's inside the controls, do nothing and let the controls
      // specific handlers take over.
      return;
    }
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    const container = containerRef.current;
    if (!container) return;

    let timeOut: NodeJS.Timeout;
    const controlsAutoHideDelayMs = 3000;

    const handleContainerMouseMove = (e: MouseEvent) => {
      e.stopPropagation();
      // Check if the mouse event target is inside the controls element
      if (controls.contains(e.target as Node)) {
        // If it's inside the controls, do nothing and let the controls
        // specific handlers take over.
        return;
      }
      clearTimeout(timeOut);
      setIsControlsVisible(true);
      timeOut = setTimeout(() => {
        setIsControlsVisible(false);
      }, controlsAutoHideDelayMs);
    };

    const handleControlsMouseEnter = (e: MouseEvent) => {
      e.stopPropagation();
      clearTimeout(timeOut);
      setIsControlsVisible(true);
    };

    const handleControlsMouseLeave = (e: MouseEvent) => {
      e.stopPropagation();
      timeOut = setTimeout(() => {
        setIsControlsVisible(false);
      }, controlsAutoHideDelayMs);
    };

    container.addEventListener("mousemove", handleContainerMouseMove);
    controls.addEventListener("mouseenter", handleControlsMouseEnter);
    controls.addEventListener("mouseleave", handleControlsMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleContainerMouseMove);
      controls.removeEventListener("mouseenter", handleControlsMouseEnter);
      controls.removeEventListener("mouseleave", handleControlsMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className="grow h-full flex items-center relative"
    >
      <video
        ref={videoRef}
        autoPlay
        className={`aspect-video w-full`}
        src={currentPlay.currentVideo.src}
        onError={(e) => {
          if (currentPlay.currentVideo.src === "") return;
          toast.error("Ups your browser does not support this video format");
        }}
      >
        Your browser does not support the video tag.
        <track src={currentPlay.currentSubtitle.src} kind="subtitles" default />
      </video>
      <div
        ref={controlsRef}
        className={`absolute bottom-0 w-full transition-all duration-300 ${
          isControlsVisible ? "opacity-100" : "opacity-0"
        } `}
      >
        <BottomBarControls ref={videoRef} />
      </div>
    </div>
  );
}
