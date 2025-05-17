import { scan } from "react-scan"; // must be imported before React and React DOM
scan({
  enabled: true,
});

import VideoPlayer from "./component/videoPlayer/VideoPlayer";
import Sidebar from "./component/SideBar";
import Tabs from "./component/tabs/Tabs";

export default function App() {
  return (
    <main className="bg-base h-dvh p-2 relative">
      <div className="flex h-full overflow-hidden">
        <div className="bg-black grow rounded-xl relative overflow-hidden">
          <VideoPlayer />
        </div>
        <Sidebar>
          <Tabs />
        </Sidebar>
      </div>
    </main>
  );
}
