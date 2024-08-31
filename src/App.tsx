import { SetStateAction, useState } from "react";
import MovieIcon from "./component/svg/Movie";
import SubtitleIcon from "./component/svg/Subtitle";

type CurrentPlay = {
  currentVideo: string;
  currentSubtitle: string;
};

type Tabs = "videos" | "subtitles";

const ACCEPTEDFILE = {
  videos: "video/*,.mkv,.avi,.mp4,.mov,.wmv",
  subtitle: ".vtt,.srt",
};

export default function App() {
  const [currentPlay, setCurrentPlay] = useState<CurrentPlay>({
    currentVideo: "",
    currentSubtitle: "",
  });

  return (
    <main className="flex flex-col justify-center items-center gap-16 h-dvh px-14 py-10 border-2">
      <h1 className="font-black text-zinc-900 text-6xl">MOVIE TIME 📺</h1>
      <div className="w-full max-w-6xl flex gap-8">
        <div className="basis-[70%] shrink-0 grow-0 overflow-hidden bg-black rounded-lg">
          <video
            controls
            autoPlay
            className="aspect-video w-full"
            src={currentPlay.currentVideo}
          >
            Your browser does not support the video tag.
            <track
              src={currentPlay.currentSubtitle}
              label="Indonesian"
              kind="subtitles"
              default
            />
          </video>
        </div>
        <div className="basis-[30%] shrink-0 grow-0 overflow-hidden">
          <Tabs setPlayer={setCurrentPlay} />
        </div>
      </div>
    </main>
  );
}

function Tabs({
  setPlayer,
}: {
  setPlayer: React.Dispatch<SetStateAction<CurrentPlay>>;
}) {
  const [tabs, setTabs] = useState<Tabs>("videos");
  const [videos, setVideos] = useState<FileList | null>(null);
  const [subtitles, setSubtitles] = useState<FileList | null>(null);

  return (
    <div className="flex flex-col h-full">
      <div className="flex bg-black p-1 rounded-xl">
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
      <div className="grow">
        {tabs === "videos" && (
          <div
            className={`h-full border-r-2 border-b-2 border-l-2 border-zinc-500 border-dashed rounded-lg`}
          >
            {videos !== null ? (
              <Lists list={Array.from(videos)} setState={setPlayer} />
            ) : (
              <div className="h-full flex justify-center items-center text-gray-500">
                <p>Empty</p>
              </div>
            )}
          </div>
        )}
        {tabs === "subtitles" && (
          <div
            className={`h-full border-r-2 border-b-2 border-l-2 border-zinc-500 border-dashed rounded-lg`}
          >
            {subtitles !== null ? (
              <Lists list={Array.from(subtitles)} setState={setPlayer} />
            ) : (
              <div className="h-full flex justify-center items-center text-gray-500">
                <p>Empty</p>
              </div>
            )}
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
        tabs === tabName ? "bg-white text-slate-950" : "text-white"
      }`}
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
    <div className="border-2 border-zinc-500 border-dashed rounded-lg overflow-x-hidden overflow-y-auto">
      <label
        htmlFor="inputFile"
        className="bg-zinc-200 py-2 font-bold flex gap-1 justify-center items-center cursor-pointer"
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
  setState,
}: {
  list: File[];
  setState: React.Dispatch<SetStateAction<CurrentPlay>>;
}) {
  return (
    <ol className="flex flex-col">
      {list.map((data, index) => (
        <li
          key={index}
          className={`p-2 cursor-pointer text-sm flex items-center gap-1 ${
            index % 2 !== 0 && "bg-zinc-200"
          }`}
          title={data.name}
          onClick={() => {
            setState((prev) => ({
              ...prev,
              [data.type === "video/x-matroska"
                ? "currentVideo"
                : "currentSubtitle"]: URL.createObjectURL(data),
            }));
          }}
        >
          <div className="aspect-square w-6">
            {data.type === "video/x-matroska" ? (
              <MovieIcon />
            ) : (
              <SubtitleIcon />
            )}
          </div>
          <span className="line-clamp-1">{data.name}</span>
        </li>
      ))}
    </ol>
  );
}
