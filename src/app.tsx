import { useEffect, useState } from "react";
import "./styles.css";

const phaseMap = {
  [Event.CAPTURING_PHASE]: "capture",
  [Event.AT_TARGET]: "target",
  [Event.BUBBLING_PHASE]: "bubble"
};

export default function App() {
  const [isBinding, setIsBinding] = useState(false);
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!isBinding) {
      console.log("[effect]: doing nothing");
      return;
    }
    console.log("[effect: start]: adding event listener");

    function onClick(event: MouseEvent) {
      console.log(
        `👂 event listener called! in ${phaseMap[event.eventPhase]} phase`
      );
    }

    //this is getting picked up in the original click that did the setIsBinding!!
    window.addEventListener("click", onClick, { capture: false });

    return () => {
      console.log("[effect: cleanup]");
      window.removeEventListener("click", onClick, { capture: false });
    };
  }, [isBinding]);

  // A setState in the render doesn't have the same impact
  // if(!element) {
  //   setElement(document.createElement('button'));
  // }

  return (
    <>
      <button
        onClick={(event) => {
          console.log(
            `[onClick] event phase: ${phaseMap[event.nativeEvent.eventPhase]}`
          );
          console.log("[onClick]: updating state]");
          setIsBinding((v) => !v);
        }}
      >
        {isBinding ? "unbind event listener" : "Bind event listener"}
      </button>
      {/* This line causes the last render effect to be flushed immediately */}
      {isBinding ? <div ref={setElement} /> : null}
    </>
  );
}
