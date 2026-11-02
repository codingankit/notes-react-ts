import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./main.css";
import { store, persistor } from "./app/store";
import Notes from "./app/Notes";

createRoot(document.getElementById("appContainer")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Notes />
      </PersistGate>
    </Provider>
  </StrictMode>,
);
