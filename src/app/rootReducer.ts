import { combineReducers } from "@reduxjs/toolkit";
import { persistReducer, type PersistConfig } from "redux-persist";
import storage from "redux-persist/lib/storage";
import handleNotesReducer from "@/features/handleNotesSlice";
import handleUIReducer from "@/features/handleUISlice";

const rootReducer = combineReducers({
  handleNotes: handleNotesReducer,
  handleUI: handleUIReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const persistConfig: PersistConfig<RootState> = {
  key: "user-notes",
  storage,
  whitelist: ["handleNotes"],
};

export default persistReducer<RootState>(persistConfig, rootReducer);
