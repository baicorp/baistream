import { SetStateAction, useMemo, useState } from "react";
import InputFile from "./InputFile";
import Lists from "./Lists";
import { ACCEPTEDFILE } from "../constant";

type Tabs = "videos" | "subtitles";

export default function Tabs() {
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

  const listFiles = tabs === "videos" ? videoFiles : subtitleFiles;

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
        {listFiles !== null ? (
          <Lists list={listFiles} />
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
