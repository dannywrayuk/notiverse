import { useDraggable } from "../hooks/useDraggable";

export const CanvasBackground = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const circleSize = 1;
  const patternSize = 20;
  const position = useDraggable(window, {
    initialPosition: [0, 0],
    clickRule: (e: any) => e.button === 1 || e.altKey,
  });

  return (
    <div>
      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: "0px",
          left: "0px",
        }}
      >
        <pattern
          id="backgroundPattern"
          x={position[0] % patternSize}
          y={position[1] % patternSize}
          width={patternSize}
          height={patternSize}
          patternUnits="userSpaceOnUse"
          patternTransform={`translate(-${circleSize},-${circleSize})`}
        >
          <circle
            cx={circleSize}
            cy={circleSize}
            r={circleSize}
            fill="#91919a"
          ></circle>
        </pattern>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#backgroundPattern)"
        ></rect>
      </svg>
      <div
        style={{
          position: "absolute",
          top: "0px",
          left: "0px",
          width: 0,
          height: 0,
          transform: `translate(${position[0]}px,${position[1]}px)`,
        }}
      >
        <svg
          style={{
            transform: `translate(-${patternSize}px,-${patternSize}px)`,
          }}
        >
          <circle
            cx={patternSize}
            cy={patternSize}
            r={patternSize / 4}
            fill="#91919a"
          ></circle>
        </svg>
        {children}
      </div>
    </div>
  );
};
