import { useEffect, useState } from "react";

export const useUserPosition = () => {
  const [position, setPosition] = useState([
    [0, 0],
    [0, 0],
  ]);

  useEffect(() => {
    let isMoving = false;
    let initialDragPosition = [0, 0];
    const downHandler = (event: MouseEvent) => {
      if (event.button !== 1 && !event.altKey) return;
      isMoving = true;
      initialDragPosition = [event.clientX, event.clientY];
    };
    const movementHandler = (event: MouseEvent) => {
      if (isMoving) {
        const deltaX = event.clientX - initialDragPosition[0];
        const deltaY = event.clientY - initialDragPosition[1];
        setPosition((p) => [p[0], [deltaX, deltaY]]);
      }
    };
    const upHandler = (event: MouseEvent) => {
      if (event.button !== 1 && !event.altKey) return;
      setPosition((p) => [
        [p[0][0] + p[1][0], p[0][1] + p[1][1]],
        [0, 0],
      ]);
      isMoving = false;
    };
    window.addEventListener("mousedown", downHandler);
    window.addEventListener("mousemove", movementHandler);
    window.addEventListener("mouseup", upHandler);
    return () => {
      window.removeEventListener("mousedown", downHandler);
      window.removeEventListener("mousemove", movementHandler);
      window.removeEventListener("mouseup", upHandler);
    };
  }, []);
  return [position[0][0] + position[1][0], position[0][1] + position[1][1]];
};
