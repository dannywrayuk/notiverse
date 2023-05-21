import { create } from "zustand";

type Note = {
  id: string;
  text: string;
  color: string;
};

type GlobalState = {
  notes: Note[];
  createNote: (note: Note) => void;
};

export const useGlobalStore = create<GlobalState>((set) => ({
  notes: [
    {
      id: "note1",
      text: "first note",
      color: "yellowgreen",
    },
    {
      id: "note2",
      text: "second note",
      color: "greenyellow",
    },
  ],
  createNote: (note) =>
    set((state) => ({
      notes: state.notes.concat(note),
    })),
}));
