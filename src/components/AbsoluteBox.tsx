export const AbsoluteBox = ({
  x,
  y,
  children,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
}) => {
  return (
    <div style={{ position: "absolute", left: x, top: y }}>{children}</div>
  );
};
