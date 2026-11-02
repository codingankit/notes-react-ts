import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/app/store";
import styles from "./EditNote.module.css";
import NoteForm from "@/components/NoteForm";
import { toggleModal } from "@/features/handleUISlice";

const { editModal, modalContent, modalTitle, closeBtn, modalHeader } = styles;

const EditNote = () => {
  const isModalOpen = useAppSelector((state) => state.handleUI.isModalOpen);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  return (
    isModalOpen && (
      <div className={editModal}>
        <div className={modalContent}>
          <div className={modalHeader}>
            <h2 className={modalTitle}>Edit Note</h2>
            <button
              className={closeBtn}
              onClick={() => dispatch(toggleModal())}
            >
              &times;
            </button>
          </div>
          <NoteForm />
        </div>
      </div>
    )
  );
};

export default EditNote;
