import VideoPlayer from "./component/VideoPlayer";
import Tabs from "./component/Tabs";

export default function App() {
  return (
    <main className="bg-bg-pattern flex justify-center items-center h-dvh px-14 py-10">
      <div className="w-full max-w-6xl flex flex-col gap-8">
        <h1 className="text-center font-bold text-8xl">MOVIE TIME 📺</h1>
        <div className="flex justify-between gap-8">
          <div className="basis-[70%] overflow-hidden bg-black rounded-lg">
            <VideoPlayer />
          </div>
          <div className="basis-[30%] overflow-hidden">
            <Tabs />
          </div>
        </div>
      </div>
    </main>
  );
}
