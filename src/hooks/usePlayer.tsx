import { useContext } from "react";
import { VideoPlayer } from "../contexts/VideoPlayer";

export default function useVideoPlayer() {
  const player = useContext(VideoPlayer);
  if (!player) {
    throw new Error("UsePlayer must be inside a musicProvider");
  }
  return player;
}
