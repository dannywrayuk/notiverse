import { CanvasBackground } from "./components/CanvasBackground";
import { DraggableBox3 } from "./components/DraggableBox3";
import { useGlobalStore } from "./hooks/state/useGlobalStore";

const App = () => {
  const [notes, createNote] = useGlobalStore((state) => [
    state.notes,
    state.createNote,
  ]);
  return (
    <CanvasBackground>
      {notes.map((note, idx) => (
        <DraggableBox3 key={note.id} noteIndex={idx}>
          <div
            style={{
              width: 200,
              height: 200,
              backgroundColor: note.color,
              padding: 20,
            }}
          >
            {note.text}
          </div>
        </DraggableBox3>
      ))}
      <button
        onClick={() =>
          createNote({
            id: Math.random().toString(),
            text: "new nooote",
            color: "pink",
          })
        }
      >
        create note
      </button>
    </CanvasBackground>
  );
};

export default App;
