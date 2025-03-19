import { SetStateAction, useMemo, useState } from "react";
import InputFile from "./InputFile";
import Lists from "./Lists";
import { ACCEPTEDFILE } from "../constant";
import { toast } from "sonner";

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
        <InputFile
          label={`Add ${tabs}`}
          setState={tabs === "videos" ? setVideos : setSubtitles}
          acceptedFile={ACCEPTEDFILE[tabs === "videos" ? "videos" : "subtitle"]}
        />
      </div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          e.currentTarget.classList.add("drop-zone-active");
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove("drop-zone-active");
        }}
        onDrop={(e) => {
          e.preventDefault();
          e.currentTarget.classList.remove("drop-zone-active");
          // Handle the dropped files with e.dataTransfer.files
          const files = e.dataTransfer.files;
          const acceptedFileArray =
            ACCEPTEDFILE[tabs === "videos" ? "videos" : "subtitle"].split(",");
          // check all file is accepted format, if not then return
          for (const file of Array.from(files)) {
            if (!isAcceptedFormat(file, acceptedFileArray)) {
              toast.error(`Supported format : ${acceptedFileArray.toString()}`);
              return;
            }
          }
          tabs === "videos" ? setVideos(files) : setSubtitles(files);
        }}
        className="grow lg:max-h-[255.34px] xl:max-h-[349.84px] overflow-x-hidden overflow-y-auto border-r-2 border-b-2 border-l-2 border-zinc-500 border-dashed rounded-lg"
      >
        {listFiles !== null ? (
          <Lists list={listFiles} />
        ) : (
          <div className="h-full flex justify-center items-center text-gray-500">
            <p>Drop files here</p>
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
      }`}
      onClick={() => {
        setState(tabName);
      }}
    >
      {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
    </button>
  );
}

function isAcceptedFormat(file: File, acceptedFormats: string[]) {
  return acceptedFormats.some((format) => {
    // Handle wildcard MIME types (e.g., video/*)
    if (format.endsWith("/*")) {
      const mainType = format.split("/")[0];
      return file?.type.startsWith(mainType + "/");
    }

    // Handle file extensions
    if (format.startsWith(".")) {
      const extension = "." + file?.name?.split(".")?.pop()?.toLowerCase();
      return extension === format.toLowerCase();
    }

    // Handle exact MIME type matches
    return file?.type === format;
  });
}
