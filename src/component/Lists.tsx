import useVideoPlayer from "../hooks/usePlayer";
import { convertSrtToVttFile } from "../utils";
import MovieIcon from "./svg/Movie";
import SubtitleIcon from "./svg/Subtitle";

export default function Lists({ list }: { list: File[] }) {
  const { currentPlay, setCurrentPlay } = useVideoPlayer();

  return (
    <ol className="divide-y-2 divide-zinc-600">
      {list.map((dataFile, index) => {
        const isVideo = dataFile.type.includes("video");
        return (
          <li
            key={index}
            className={`p-2 cursor-pointer text-sm flex items-center gap-1 ${
              currentPlay[isVideo ? "currentVideo" : "currentSubtitle"][
                "name"
              ] === dataFile.name
                ? "bg-zinc-600"
                : "bg-none"
            }`}
            title={dataFile.name}
            onClick={async () => {
              const isSrtFile = dataFile.name.endsWith(".srt");
              let vttFile: File;
              if (isSrtFile) {
                vttFile = await convertSrtToVttFile(dataFile);
              }
              setCurrentPlay((prev) => {
                return {
                  ...prev,
                  [isVideo ? "currentVideo" : "currentSubtitle"]: {
                    src: isSrtFile
                      ? URL.createObjectURL(vttFile)
                      : URL.createObjectURL(dataFile),
                    name: isSrtFile
                      ? vttFile.name.replace(".vtt", ".srt")
                      : dataFile.name,
                  },
                };
              });
            }}
          >
            <div className="aspect-square w-6">
              {dataFile.type.includes("video") ? (
                <MovieIcon />
              ) : (
                <SubtitleIcon />
              )}
            </div>
            <span className="line-clamp-1">{dataFile.name}</span>
          </li>
        );
      })}
    </ol>
  );
}
