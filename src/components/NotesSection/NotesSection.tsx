import { useAppSelector } from "@/app/store";
import styles from "./NotesSection.module.css";
import NoteList from "@/components/NoteList";
import NoNotes from "@/components/NoNotes";

const NotesSection = () => {
  const activeTab = useAppSelector((state) => state.handleUI.activeTab);
  return (
    activeTab === "notes" && (
      <section className={styles.notesSection}>
        <NoteList />
        <NoNotes />
      </section>
    )
  );
};

export default NotesSection;
