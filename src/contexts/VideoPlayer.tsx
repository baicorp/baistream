import { createContext, useState, ReactElement, ReactNode } from "react";

type CurrentPlay = {
  currentVideo: {
    src: string;
    name: string;
  };
  currentSubtitle: {
    src: string;
    name: string;
  };
};

type VideoPlayerType = {
  currentPlay: CurrentPlay;
  setCurrentPlay: React.Dispatch<React.SetStateAction<CurrentPlay>>;
};

export const VideoPlayer = createContext<VideoPlayerType | undefined>(
  undefined
);

export default function VideoPlayerProvider({
  children,
}: {
  children: ReactElement | ReactElement[] | ReactNode;
}) {
  const [currentPlay, setCurrentPlay] = useState<CurrentPlay>({
    currentVideo: {
      src: "",
      name: "",
    },
    currentSubtitle: {
      src: "",
      name: "",
    },
  });

  const contextValue = { currentPlay, setCurrentPlay };

  return (
    <VideoPlayer.Provider value={contextValue}>{children}</VideoPlayer.Provider>
  );
}
