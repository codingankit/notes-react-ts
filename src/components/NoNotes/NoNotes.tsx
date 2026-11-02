import { useAppSelector } from "@/app/store";
import styles from "./NoNotes.module.css";

const NoNotes = () => {
  const notes = useAppSelector((state) => state.handleNotes);
  return (
    notes.length === 0 && (
      <div className={styles.noNotes}>
        <h2>No Notes Yet!</h2>
        <p>Start by creating your first note 🎉</p>
      </div>
    )
  );
};

export default NoNotes;
