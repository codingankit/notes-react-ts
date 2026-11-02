import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Tab {
  id: string;
  label: string;
}

const tabs: Tab[] = [
  { id: "notes", label: "Notes" },
  { id: "create", label: "Create Note" },
];

interface InitialState {
  tabs: Tab[];
  activeTab: string;
  isModalOpen: boolean;
  noteIndexToEdit: number | null;
}

const initialState: InitialState = {
  tabs,
  activeTab: tabs[0].id,
  isModalOpen: false,
  noteIndexToEdit: null,
};

const handleUI = createSlice({
  name: "handleUI",
  initialState,
  reducers: {
    changeTab: (currState, action: PayloadAction<string>) => {
      currState.activeTab = action.payload;
    },
    toggleModal: (currState) => {
      currState.isModalOpen = !currState.isModalOpen;
    },
    setNoteToEdit: (currState, action: PayloadAction<number | null>) => {
      currState.noteIndexToEdit = action.payload;
    },
  },
});

export const { changeTab, toggleModal, setNoteToEdit } = handleUI.actions;

export default handleUI.reducer;
