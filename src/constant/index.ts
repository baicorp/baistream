export const ACCEPTEDFILE = {
  videos: "video/*,.mkv,.avi,.mp4,.mov,.wmv",
  subtitle: ".vtt,.srt",
};

type KeyBindItemType = {
  title: string;
  keys: string[];
};

export const keyBindItems: KeyBindItemType[] = [
  { title: "Play/pause", keys: ["Spacebar"] },
  { title: "Forward 10s", keys: ["→"] },
  { title: "Replay 10s", keys: ["←"] },
  { title: "Next Videos", keys: ["Shift", "→"] },
  { title: "Previous Videos", keys: ["Shift", "←"] },
  { title: "Volume +", keys: ["↑"] },
  { title: "Volume -", keys: ["↓"] },
  { title: "Mute", keys: ["M"] },
  { title: "Toggle sidebar", keys: ["T"] },
  { title: "Caption", keys: ["C"] },
  { title: "Picture in picture", keys: ["I"] },
];
