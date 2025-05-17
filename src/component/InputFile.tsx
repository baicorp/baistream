import { SetStateAction } from "react";

export default function InputFile({
  label,
  acceptedFile,
  setState,
}: {
  label: React.ReactNode;
  acceptedFile: string;
  setState: React.Dispatch<SetStateAction<FileList | null>>;
}) {
  return (
    <label htmlFor="inputFile" className="flex gap-1 cursor-pointer">
      {label}
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
    </label>
  );
}
