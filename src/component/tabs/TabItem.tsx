import { SetStateAction } from "react";
import { TabsType } from "./Tabs";

export default function TabItem({
  tabName,
  tabs,
  setState,
}: {
  tabName: TabsType;
  tabs: TabsType;
  setState: React.Dispatch<SetStateAction<TabsType>>;
}) {
  return (
    <button
      className={`
    flex-1 px-6 py-2 text-sm font-semibold text-nowrap
    ${
      tabs === tabName
        ? `bg-primary text-base rounded-full`
        : `bg-secondary text-primary ${
            tabName === "videos"
              ? "rounded-r-md rounded-l-full"
              : tabName === "subtitles"
              ? "rounded-md"
              : tabName === "key bind"
              ? "rounded-r-full rounded-l-md"
              : ""
          }`
    }`}
      onClick={() => {
        setState(tabName);
      }}
    >
      {tabName.charAt(0).toUpperCase() + tabName.slice(1)}
    </button>
  );
}
