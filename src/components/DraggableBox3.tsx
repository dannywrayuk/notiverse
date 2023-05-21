import { useDraggable } from "../hooks/useDraggable3";
import { useGlobalStore } from "../hooks/state/useGlobalStore";

export const DraggableBox3 = ({
  children,
  noteIndex,
}: {
  children: React.ReactNode;
  noteIndex: number;
}) => {
  const ref = useDraggable();
  const note = useGlobalStore((state) => state.notes[noteIndex]);

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
      }}
    >
      {children}
      my id is: {note.id}
    </div>
  );
};
