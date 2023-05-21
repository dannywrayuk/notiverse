import { useState } from "react";
import { useDraggable } from "../hooks/useDraggable2";

export const DraggableBox2 = ({ children }: { children: React.ReactNode }) => {
  const [p, sp] = useState([0, 0]);
  const ref = useDraggable((x, y) => {
    sp([x, y]);
    return [x, y];
  });

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
      }}
    >
      {children}
      {`[${p[0]}, ${p[1]}]`}
    </div>
  );
};
