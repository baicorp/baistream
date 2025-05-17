import { toast } from "sonner";
import { Add } from "../../svg";
import InputFile from "../../InputFile";
import ListFiles from "../../ListFiles";
import { ACCEPTEDFILE } from "../../../constant";
import isAcceptedFormat from "../../../lib/isAccpetedFormat";
import { forwardRef, SetStateAction, useMemo, useState } from "react";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { TabsType } from "../Tabs";

interface ListFileContentProps {
  tabs: TabsType;
  files: File[] | null;
  setFile: React.Dispatch<SetStateAction<FileList | null>>;
  isFfmpegReady: boolean;
}

const ListFileContent = forwardRef<FFmpeg, ListFileContentProps>(
  ({ tabs, files, setFile, isFfmpegReady }, ref) => {
    return (
      <div
        className="grow flex flex-col overflow-x-hidden overflow-y-auto"
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
          setFile(files);
        }}
      >
        <InputFileButton tabs={tabs} setFile={setFile} />
        {isFfmpegReady ? (
          files !== null ? (
            <ListFiles files={files} ref={ref} />
          ) : (
            <InputFileLink tabs={tabs} setFile={setFile} />
          )
        ) : (
          <LoadFfmpeg />
        )}
      </div>
    );
  }
);

interface InputFileProps {
  tabs: TabsType;
  setFile: React.Dispatch<SetStateAction<FileList | null>>;
}

function InputFileButton({ tabs, setFile }: InputFileProps) {
  return (
    <button className="max-w-fit">
      <InputFile
        label={
          <div className="text-primary text-sm flex items-center px-4 py-1.5 font-semibold rounded-xl border-2 border-primary mb-2">
            <Add />
            Add
          </div>
        }
        setState={setFile}
        acceptedFile={ACCEPTEDFILE[tabs === "videos" ? "videos" : "subtitle"]}
      />
    </button>
  );
}

function InputFileLink({ tabs, setFile }: InputFileProps) {
  return (
    <div className="grow flex justify-center items-center gap-1 text-primary">
      <InputFile
        label={
          <span>
            Drops your {tabs}{" "}
            <span className="font-semibold underline decoration-wavy decoration-primary">
              here
            </span>
          </span>
        }
        setState={setFile}
        acceptedFile={ACCEPTEDFILE[tabs === "videos" ? "videos" : "subtitle"]}
      />
    </div>
  );
}

function LoadFfmpeg() {
  return (
    <div className="grow flex justify-center items-center text-primary">
      <p className="animate-pulse">Load ffmpeg...</p>
    </div>
  );
}

export default ListFileContent;
