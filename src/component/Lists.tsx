import useVideoPlayer from "../hooks/usePlayer";
import MovieIcon from "./svg/Movie";
import SubtitleIcon from "./svg/Subtitle";

export default function Lists({ list }: { list: File[] }) {
  const { currentPlay, setCurrentPlay } = useVideoPlayer();

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
              setCurrentPlay((prev) => {
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
