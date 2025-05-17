import { keyBindItems } from "../../../constant";

export default function KeyBindTabContent() {
  const KeyBindItem = keyBindItems.map((item, index) => {
    return (
      <div key={index} className="flex justify-between items-center">
        <p>{item.title}</p>
        <div className="flex items-center gap-1">
          {item.keys.map((key, index) => {
            return (
              <div
                key={index}
                className="bg-[#FBDFFF] px-2 py-1 rounded-md font-semibold"
              >
                <p>{key}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  });
  return (
    <div className="bg-white text-primary text-sm rounded-md p-4">
      <p className="font-semibold mb-5">Keyboard Shortcuts</p>
      <div className="flex flex-col gap-3 font-[450]">{KeyBindItem}</div>
    </div>
  );
}
