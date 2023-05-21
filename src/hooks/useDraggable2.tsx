import { useEffect, useRef } from "react";

export const useDraggable = (fn = (x: any, y: any) => [x, y]) => {
  const ref = useRef<HTMLDivElement>(null);
  let initialPosition = [0, 0];
  let initialDragPosition = [0, 0];
  let isMoving = false;

  const downHandler = (event: MouseEvent) => {
    isMoving = true;
    initialDragPosition = [
      event.clientX - initialPosition[0],
      event.clientY - initialPosition[1],
    ];
  };
  const movementHandler = (event: MouseEvent) => {
    if (isMoving && ref.current) {
      event.preventDefault();
      const delta = fn(
        event.clientX - initialDragPosition[0],
        event.clientY - initialDragPosition[1]
      );
      ref.current.style.left = delta[0] + "px";
      ref.current.style.top = delta[1] + "px";
    }
  };
  const upHandler = (event: MouseEvent) => {
    if (isMoving) {
      const deltaX = event.clientX - initialDragPosition[0];
      const deltaY = event.clientY - initialDragPosition[1];
      initialPosition = [deltaX, deltaY];
    }
    isMoving = false;
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.style.left = initialPosition[0] + "px";
      ref.current.style.top = initialPosition[1] + "px";
    }
    ref.current?.addEventListener("mousedown", downHandler);
    window.addEventListener("mousemove", movementHandler);
    window.addEventListener("mouseup", upHandler);
    return () => {
      ref.current?.addEventListener("mousedown", downHandler);
      window.removeEventListener("mousemove", movementHandler);
      window.removeEventListener("mouseup", upHandler);
    };
  }, []);
  return ref;
};
