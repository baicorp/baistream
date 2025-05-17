import { useEffect, useMemo, useRef, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import ListFileContent from "./contents/ListFileContent";
import KeyBindTabContent from "./contents/KeyBindContent";
import { TabsType } from "./Tabs";

export default function TabContents({ tabs }: { tabs: TabsType }) {
  const ffmpegRef = useRef(new FFmpeg());
  const [isFfmpegReady, setIsFfmpegReady] = useState(false);
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

  useEffect(() => {
    async function loadFfmpeg() {
      setIsFfmpegReady(false);
      const ffmpeg = ffmpegRef.current;
      ffmpeg.on("log", ({ type, message }) => {
        // console.log(type, message);
      });
      await ffmpeg.load();
      await new Promise((r) => {
        setTimeout(() => {
          r("finish");
        }, 3000);
      });
      setIsFfmpegReady(true);
    }
    loadFfmpeg();
  }, []);

  return tabs === "key bind" ? (
    <KeyBindTabContent />
  ) : (
    <ListFileContent
      tabs={tabs}
      files={files}
      setFile={tabs === "videos" ? setVideos : setSubtitles}
      ref={ffmpegRef}
      isFfmpegReady={isFfmpegReady}
    />
  );
}
