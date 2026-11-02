import React, { useEffect, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/store";
import styles from "./NoteForm.module.css";
import Swal, { type SweetAlertIcon } from "sweetalert2";
import { addNote, updateNote } from "@/features/handleNotesSlice";
import { toggleModal, setNoteToEdit } from "@/features/handleUISlice";

const { noteForm, formInput, formTextarea, formSubmit } = styles;

const NoteForm = () => {
  const noteIndexToEdit = useAppSelector(
    (state) => state.handleUI.noteIndexToEdit,
  );
  const notes = useAppSelector((state) => state.handleNotes);
  const dispatch = useAppDispatch();

  const initialTitle =
    noteIndexToEdit !== null ? notes[noteIndexToEdit].title : "";
  const initialContent =
    noteIndexToEdit !== null ? notes[noteIndexToEdit].content : "";
  const btnTxt = noteIndexToEdit !== null ? "Update Note" : "Create Note";

  const [form, setForm] = useState({
    title: initialTitle,
    content: initialContent,
  });

  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setForm({ title: initialTitle, content: initialContent });
  }, [initialTitle, initialContent]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.target as HTMLFormElement;
    const { title, content } = form;
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();

    if (trimmedTitle && trimmedContent) {
      if (noteIndexToEdit === null) {
        dispatch(addNote({ title: trimmedTitle, content: trimmedContent }));
        showAlert("success", "Your note has been created successfully.");
        setForm({ title: "", content: "" });
        formElement.reset();
        setTimeout(() => {
          titleInputRef.current?.focus();
        }, 100);
      } else {
        if (
          trimmedTitle === initialTitle.trim() &&
          trimmedContent === initialContent.trim()
        ) {
          showAlert("info", "No changes detected.");
          return;
        }
        dispatch(
          updateNote({
            index: noteIndexToEdit,
            data: {
              title: trimmedTitle,
              content: trimmedContent,
            },
          }),
        );
        dispatch(toggleModal());
        dispatch(setNoteToEdit(null));
        showAlert("success", "Your note has been updated successfully.");
        setForm({ title: "", content: "" });
        formElement.reset();
      }
    }
  };

  const showAlert = (icon: SweetAlertIcon, message: string) => {
    Swal.fire({
      icon,
      text: message,
      toast: true,
      position: "top-right",
      timerProgressBar: true,
      showConfirmButton: false,
      timer: 2000,
    });
  };

  return (
    <form className={noteForm} onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        className={formInput}
        placeholder="Note Title"
        value={form.title}
        onChange={handleChange}
        ref={titleInputRef}
      />
      <textarea
        name="content"
        className={formTextarea}
        placeholder="Note Content"
        rows={8}
        cols={50}
        value={form.content}
        onChange={handleChange}
      />
      <button className={formSubmit} type="submit">
        {btnTxt}
      </button>
    </form>
  );
};

export default NoteForm;
