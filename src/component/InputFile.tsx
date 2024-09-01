import { SetStateAction } from "react";
import MovieIcon from "./svg/Movie";
import SubtitleIcon from "./svg/Subtitle";

export default function InputFile({
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
