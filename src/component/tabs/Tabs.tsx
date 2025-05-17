import { useState } from "react";
import TabContents from "./TabContent";
import TabItem from "./TabItem";

export type TabsType = "videos" | "subtitles" | "key bind";

export default function Tabs() {
  const [tabs, setTabs] = useState<TabsType>("videos");

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="flex gap-1">
        <TabItem tabName="videos" tabs={tabs} setState={setTabs} />
        <TabItem tabName="subtitles" tabs={tabs} setState={setTabs} />
        <TabItem tabName="key bind" tabs={tabs} setState={setTabs} />
      </div>
      <TabContents tabs={tabs} />
    </div>
  );
}
