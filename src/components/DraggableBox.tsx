import { useRef } from "react";
import { useDraggable } from "../hooks/useDraggable";

export const DraggableBox = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null);
  const [x, y] = useDraggable(ref, {
    initialPosition: [0, 0],
  });

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: x,
        top: y,
      }}
    >
      {children}
    </div>
  );
};
