import { useEffect, useRef } from "react";
import * as d3 from "d3";

export const useDraggable = () => {
  const ref = useRef<HTMLDivElement>(null);
  const initialPosition = { x: 0, y: 0 };
  const dragOffset = { x: 0, y: 0 };

  const startHandler = (
    event: d3.D3DragEvent<HTMLDivElement, unknown, null>
  ) => {
    dragOffset.x = event.x - initialPosition.x;
    dragOffset.y = event.y - initialPosition.y;
  };
  const dragHandler = (
    event: d3.D3DragEvent<HTMLDivElement, unknown, null>
  ) => {
    if (ref.current) {
      event.sourceEvent.preventDefault();
      ref.current.style.left = event.x - dragOffset.x + "px";
      ref.current.style.top = event.y - dragOffset.y + "px";
    }
  };

  const endHandler = (event: d3.D3DragEvent<HTMLDivElement, unknown, null>) => {
    initialPosition.x = event.x - dragOffset.x;
    initialPosition.y = event.y - dragOffset.y;
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.style.left = "0px";
      ref.current.style.top = "0px";
      d3.select(ref.current).call(
        d3
          .drag()
          .on("start", startHandler)
          .on("drag", dragHandler)
          .on("end", endHandler) as unknown as d3.DragBehavior<
          HTMLDivElement,
          unknown,
          null
        >
      );
    }
  }, []);
  return ref;
};
