import { SetStateAction, useMemo, useState } from "react";
import MovieIcon from "./component/svg/Movie";
import SubtitleIcon from "./component/svg/Subtitle";

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

type Tabs = "videos" | "subtitles";

const ACCEPTEDFILE = {
  videos: "video/*,.mkv,.avi,.mp4,.mov,.wmv",
  subtitle: ".vtt,.srt",
};

export default function App() {
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

  return (
    <>
      <main className="flex justify-center items-center h-dvh px-14 py-10">
        <div className="w-full max-w-6xl flex flex-col gap-8">
          <h1 className="text-center font-bold text-8xl">MOVIE TIME 📺</h1>
          <div className="flex justify-between gap-8">
            <div className="basis-[70%] overflow-hidden bg-black rounded-lg">
              <VideoPlayer
                videoSource={currentPlay.currentVideo.src}
                trackSource={currentPlay.currentSubtitle.src}
              />
            </div>
            <div className="basis-[30%] overflow-hidden">
              <Tabs setPlayer={setCurrentPlay} currentPlay={currentPlay} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function VideoPlayer({
  videoSource,
  trackSource,
  className,
}: {
  videoSource: string;
  trackSource: string;
  className?: React.HTMLAttributes<HTMLVideoElement>["className"];
}) {
  return (
    <video
      controls
      autoPlay
      className={`aspect-video w-full ${className}`}
      src={videoSource}
    >
      Your browser does not support the video tag.
      <track src={trackSource} kind="subtitles" default />
    </video>
  );
}

function Tabs({
  currentPlay,
  setPlayer,
}: {
  currentPlay: CurrentPlay;
  setPlayer: React.Dispatch<SetStateAction<CurrentPlay>>;
}) {
  const [tabs, setTabs] = useState<Tabs>("videos");
  const [videos, setVideos] = useState<FileList | null>(null);
  const [subtitles, setSubtitles] = useState<FileList | null>(null);

  const videoFiles: File[] | null = useMemo(() => {
    if (videos === null) return null;
    return Array.from(videos).sort((a, b) => a.name.localeCompare(b.name));
  }, [videos]);

  const subtitleFiles: File[] | null = useMemo(() => {
    if (subtitles === null) return null;
    return Array.from(subtitles).sort((a, b) => a.name.localeCompare(b.name));
  }, [subtitles]);

  const files = tabs === "videos" ? videoFiles : subtitleFiles;

  return (
    <div className="flex flex-col h-full">
      <div className="flex bg-zinc-100 p-1 rounded-xl">
        <TabItem tabName="videos" tabs={tabs} setState={setTabs} />
        <TabItem tabName="subtitles" tabs={tabs} setState={setTabs} />
      </div>
      <div>
        {tabs === "videos" && (
          <InputFile
            label="Add video"
            setState={setVideos}
            acceptedFile={ACCEPTEDFILE.videos}
          />
        )}
        {tabs === "subtitles" && (
          <InputFile
            label="Add subtitle"
            setState={setSubtitles}
            acceptedFile={ACCEPTEDFILE.subtitle}
          />
        )}
      </div>
      <div className="grow lg:max-h-[255.34px] xl:max-h-[349.84px] overflow-x-hidden overflow-y-auto border-r-2 border-b-2 border-l-2 border-zinc-500 border-dashed rounded-lg">
        {files !== null ? (
          <Lists list={files} setState={setPlayer} currentPlay={currentPlay} />
        ) : (
          <div className="h-full flex justify-center items-center text-gray-500">
            <p>Empty</p>
          </div>
        )}
      </div>
    </div>
  );
}

function TabItem({
  tabName,
  tabs,
  setState,
}: {
  tabName: Tabs;
  tabs: Tabs;
  setState: React.Dispatch<SetStateAction<Tabs>>;
}) {
  return (
    <button
      className={`flex-1 px-6 font-bold py-1.5 rounded-lg ${
        tabs === tabName ? "bg-black text-white" : "text-black"
      } transition-all`}
      onClick={() => {
        setState(tabName);
      }}
    >
      {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
    </button>
  );
}

function InputFile({
  label,
  acceptedFile,
  setState,
}: {
  label: string;
  acceptedFile: string;
  setState: React.Dispatch<SetStateAction<FileList | null>>;
}) {
  return (
    <div className="hover:bg-zinc-800 border-2 border-zinc-500 border-dashed rounded-lg overflow-x-hidden overflow-y-auto">
      <label
        htmlFor="inputFile"
        className="py-2 font-bold flex gap-1 justify-center items-center cursor-pointer"
      >
        {label.includes("video") ? <MovieIcon /> : <SubtitleIcon />}
        <span>{label}</span>
      </label>
      <input
        className="hidden"
        type="file"
        multiple
        accept={acceptedFile}
        id="inputFile"
        onChange={(e) => {
          setState(e.currentTarget.files);
        }}
      />
    </div>
  );
}

function Lists({
  list,
  currentPlay,
  setState,
}: {
  list: File[];
  currentPlay: CurrentPlay;
  setState: React.Dispatch<SetStateAction<CurrentPlay>>;
}) {
  return (
    <ol className="divide-y-2 divide-zinc-600">
      {list.map((data, index) => {
        const isVideo = data.type.includes("video");
        return (
          <li
            key={index}
            className={`p-2 cursor-pointer text-sm flex items-center gap-1 ${
              currentPlay[isVideo ? "currentVideo" : "currentSubtitle"][
                "name"
              ] === data.name
                ? "bg-zinc-600"
                : "bg-none"
            }`}
            title={data.name}
            onClick={() => {
              setState((prev) => {
                return {
                  ...prev,
                  [isVideo ? "currentVideo" : "currentSubtitle"]: {
                    src: URL.createObjectURL(data),
                    name: data.name,
                  },
                };
              });
            }}
          >
            <div className="aspect-square w-6">
              {data.type.includes("video") ? <MovieIcon /> : <SubtitleIcon />}
            </div>
            <span className="line-clamp-1">{data.name}</span>
          </li>
        );
      })}
    </ol>
  );
}
