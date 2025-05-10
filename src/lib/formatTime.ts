export default function formatTime(time: number | undefined): string {
  if (!time) return "00:00";
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  const hStr = hours > 0 ? `${String(hours)}:` : "";
  const mStr = String(minutes).padStart(2, "0") + ":";
  const sStr = String(seconds).padStart(2, "0");

  return hStr + mStr + sStr;
}
