import { animate } from "framer-motion";
import { useEffect, useRef } from "react";

function abbreviateNumber(value) {
  const suffixes = ["", "K", "M", "B", "T"];
  let magnitude = 0;
  while (value >= 1000) {
    value /= 1000;
    magnitude++;
  }
  if (suffixes[magnitude] === "") return value.toFixed(0);
  return value.toFixed(1) + suffixes[magnitude];
}

function Counter({ to }) {
  const nodeRef = useRef();

  useEffect(() => {
    const node = nodeRef.current;

    const controls = animate(0, to, {
      duration: 1,
      onUpdate(value) {
        node.textContent = abbreviateNumber(value);
      },
    });

    return () => controls.stop();
  }, [to]);

  return <h1 className="text-orange-500 font-bold text-2xl" ref={nodeRef} />;
}

export default Counter;
