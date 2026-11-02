import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Note {
  title: string;
  content: string;
}

interface UpdateNote {
  index: number;
  data: Note;
}

const initialState: Note[] = [];

const handleNotesSlice = createSlice({
  name: "handleNotes",
  initialState,
  reducers: {
    initNotes: (_, action: PayloadAction<Note[]>) => action.payload,
    addNote: (currNotes, action: PayloadAction<Note>) => {
      currNotes.unshift(action.payload);
    },
    updateNote: (currNotes, action: PayloadAction<UpdateNote>) => {
      const { index, data } = action.payload;
      currNotes[index] = data;
    },
    deleteNote: (currNotes, action: PayloadAction<number>) => {
      currNotes.splice(action.payload, 1);
    },
  },
});

export const { initNotes, addNote, updateNote, deleteNote } =
  handleNotesSlice.actions;
export default handleNotesSlice.reducer;
