import { toast } from "sonner";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { Movie, Subtitle } from "./svg";
import { fetchFile } from "@ffmpeg/util";
import { forwardRef, useState } from "react";
import { convertSrtToVttFile } from "../utils";
import useVideoPlayer from "../hooks/usePlayer";

const ListFiles = forwardRef<FFmpeg, { files: File[] }>(({ files }, ref) => {
  return (
    <ol className="grow divide-y-2 divide-secondary">
      {files.map((file) => {
        return <ListFileItem key={file.name} ref={ref} file={file} />;
      })}
    </ol>
  );
});

const ListFileItem = forwardRef<FFmpeg, { file: File }>(({ file }, ref) => {
  const { currentPlay, setCurrentPlay } = useVideoPlayer();
  const isVideo = file.type.includes("video");
  const [isLoading, setIsLoading] = useState(false);

  async function handleClickedFile(file: File) {
    // if .srt file then convert the .srt to .vtt and set to currentPlay subtitle
    if (file.name.endsWith(".srt")) {
      let vttFile = await convertSrtToVttFile(file);
      setCurrentPlay((prev) => {
        return {
          ...prev,
          currentSubtitle: {
            name: file.name,
            src: URL.createObjectURL(vttFile),
          },
        };
      });
      return;
    }
    if (file.name.endsWith(".vtt")) {
      setCurrentPlay((prev) => {
        return {
          ...prev,
          currentSubtitle: {
            name: file.name,
            src: URL.createObjectURL(file),
          },
        };
      });
      return;
    }
    // try to get the embeded subtitle from video file
    try {
      if (ref && typeof ref !== "function") {
        const ffmpeg = ref.current;
        const fileName = file.name;
        const outputVttFileName = "subtitle.vtt";

        setIsLoading(true);
        await ffmpeg?.writeFile(fileName, await fetchFile(file));
        // get the embeded subtitle from video file if any
        await ffmpeg?.exec([
          "-i",
          fileName,
          "-map",
          "0:s:0",
          outputVttFileName,
        ]);
        const subtitleFile = await ffmpeg?.readFile(outputVttFileName);
        if (subtitleFile === undefined)
          throw new Error("subtitle not available");

        setCurrentPlay({
          currentVideo: {
            name: fileName,
            src: URL.createObjectURL(file),
          },
          currentSubtitle: {
            name: outputVttFileName,
            src: URL.createObjectURL(
              new Blob([subtitleFile], { type: "text/vtt" })
            ),
          },
        });
        await ffmpeg?.deleteFile(fileName);
        await ffmpeg?.deleteFile(outputVttFileName);
        setIsLoading(false);
        return;
      }
    } catch (error) {
      toast.info("video does not have subtitle");
      // if failed to get the subtitle then just add the video file to currentPlay
    }
    setCurrentPlay({
      currentVideo: {
        name: file.name,
        src: URL.createObjectURL(file),
      },
      currentSubtitle: {
        name: "",
        src: "",
      },
    });
    setIsLoading(false);
  }

  // temporary function for dev-mode
  async function handleClickedFileDev(file: File) {
    const isSrtFile = file.name.endsWith(".srt");
    let vttFile: File;
    if (isSrtFile) {
      vttFile = await convertSrtToVttFile(file);
    }
    setCurrentPlay((prev) => {
      return {
        ...prev,
        [isVideo ? "currentVideo" : "currentSubtitle"]: {
          src: isSrtFile
            ? URL.createObjectURL(vttFile)
            : URL.createObjectURL(file),
          name: isSrtFile ? vttFile.name.replace(".vtt", ".srt") : file.name,
        },
      };
    });
  }

  return (
    <li
      className={`p-2 cursor-pointer text-sm text-primary flex items-center gap-1 ${
        currentPlay[isVideo ? "currentVideo" : "currentSubtitle"]["name"] ===
        file.name
          ? "bg-secondary"
          : "bg-none"
      }`}
      title={file.name}
      onClick={() => {
        switch (import.meta.env.MODE) {
          case "development":
            handleClickedFileDev(file);
            break;
          case "production":
            handleClickedFile(file);
            break;
          default:
            toast.info("something wrong in detecting environment");
            break;
        }
      }}
    >
      <div className="aspect-square w-6">
        {isLoading ? (
          <div className="w-6 aspect-square rounded-full bg-secondary animate-pulse"></div>
        ) : file.type.includes("video") ? (
          <Movie />
        ) : (
          <Subtitle />
        )}
      </div>
      <span className="line-clamp-1">{file.name}</span>
    </li>
  );
});

export default ListFiles;
