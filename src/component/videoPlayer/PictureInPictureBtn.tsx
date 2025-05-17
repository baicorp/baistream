import { forwardRef, useEffect, useState } from "react";
import { Pip, PipOff } from "../svg";
import { toast } from "sonner";

const PictureInPictureButton = forwardRef<HTMLVideoElement, {}>((_, ref) => {
  const videoElement = ref as React.RefObject<HTMLVideoElement>;
  const [isPipActive, setIsPipActive] = useState(false);

  const handlePIP = async () => {
    const video = videoElement.current;
    if (!video) return;
    // ensure video is playing valid source
    if (video.src === window.location.origin + "/") return;
    // check if PIP suppoerted by user browser
    if ("documentPictureInPicture" in window === false) {
      // if not suppoerted then show error toast
      toast.error("Your browser does not support PIP.");
      return;
    }
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else {
        await video.requestPictureInPicture();
      }
    } catch (error) {
      toast.error("error entering/exiting the PIP");
    }
    setIsPipActive((prev) => !prev);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case "i":
          handlePIP();
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
    <button onClick={handlePIP}>{isPipActive ? <Pip /> : <PipOff />}</button>
  );
});

export default PictureInPictureButton;
