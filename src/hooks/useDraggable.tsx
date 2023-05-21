import { useEffect, useState } from "react";

export const useDraggable = (ref: any, options: any) => {
  const initialPosition = options?.initialPosition || [0, 0];
  const clickRule =
    options?.clickRule || ((e: any) => e.button === 0 && !e.altKey);
  const [position, setPosition] = useState(initialPosition);
  let internalPosition = initialPosition;
  let initialDragPosition = [0, 0];
  let isMoving = false;

  useEffect(() => {
    const internalRef = ref?.current?.addEventListener ? ref.current : ref;
    if (!internalRef.addEventListener) return;
    const downHandler = (event: MouseEvent) => {
      if (clickRule(event)) {
        isMoving = true;
        initialDragPosition = [event.clientX, event.clientY];
      }
    };
    const movementHandler = (event: MouseEvent) => {
      if (isMoving) {
        event.preventDefault();
        const deltaX = event.clientX - initialDragPosition[0];
        const deltaY = event.clientY - initialDragPosition[1];
        setPosition([
          internalPosition[0] + deltaX,
          internalPosition[1] + deltaY,
        ]);
      }
    };
    const upHandler = (event: MouseEvent) => {
      if (isMoving) {
        const deltaX = event.clientX - initialDragPosition[0];
        const deltaY = event.clientY - initialDragPosition[1];
        internalPosition = [
          internalPosition[0] + deltaX,
          internalPosition[1] + deltaY,
        ];
      }
      isMoving = false;
    };
    internalRef.addEventListener("mousedown", downHandler);
    window.addEventListener("mousemove", movementHandler);
    window.addEventListener("mouseup", upHandler);
    return () => {
      internalRef.addEventListener("mousedown", downHandler);
      window.removeEventListener("mousemove", movementHandler);
      window.removeEventListener("mouseup", upHandler);
    };
  }, []);

  return position;
};
