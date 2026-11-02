import { useAppSelector } from "@/app/store";
import styles from "./CreateNote.module.css";
import NoteForm from "@/components/NoteForm";

const AddNote = () => {
  const activeTab = useAppSelector((state) => state.handleUI.activeTab);
  return (
    activeTab === "create" && (
      <section className={styles.noteFormSection}>
        <NoteForm />
      </section>
    )
  );
};

export default AddNote;
