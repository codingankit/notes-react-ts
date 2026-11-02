import { useAppSelector, useAppDispatch } from "@/app/store";
import Swal from "sweetalert2";
import styles from "./NoteList.module.css";
import { deleteNote } from "@/features/handleNotesSlice";
import { toggleModal, setNoteToEdit } from "@/features/handleUISlice";

const {
  notesView,
  noteCard,
  noteTitle,
  noteContent,
  noteActions,
  editBtn,
  deleteBtn,
} = styles;

const NoteList = () => {
  const notes = useAppSelector((state) => state.handleNotes || []);
  const dispatch = useAppDispatch();

  const handleEdit = (index: number) => {
    dispatch(setNoteToEdit(index));
    dispatch(toggleModal());
  };

  const handleDelete = (index: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteNote(index));
        Swal.fire({
          icon: "success",
          text: "Your note has been deleted successfully.",
          toast: true,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  };
  return (
    notes.length !== 0 && (
      <section className={notesView}>
        {notes.map((note, index) => {
          return (
            <div className={noteCard} key={index}>
              <h2 className={noteTitle}>{note.title}</h2>
              <p className={noteContent}>{note.content}</p>
              <div className={noteActions}>
                <button
                  className={editBtn}
                  onClick={() => {
                    handleEdit(index);
                  }}
                >
                  Edit
                </button>
                <button
                  className={deleteBtn}
                  onClick={() => {
                    handleDelete(index);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </section>
    )
  );
};

export default NoteList;
