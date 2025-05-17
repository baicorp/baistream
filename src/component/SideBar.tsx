import { useEffect, useState } from "react";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    function keyBind(e: KeyboardEvent) {
      switch (e.key.toLocaleLowerCase()) {
        case "t":
          setShrink((prev) => !prev);
          break;
        default:
          break;
      }
    }
    window.addEventListener("keypress", keyBind);
    return () => window.removeEventListener("keypress", keyBind);
  }, []);

  return (
    <div
      className={`relative ${
        shrink ? "w-0" : "w-[356px] grow-0 shrink-0 pl-2"
      } transition-all`}
    >
      {children}
      <div className="bg-primary w-6 aspect-square rounded-l-full absolute -left-6"></div>
    </div>
  );
}
