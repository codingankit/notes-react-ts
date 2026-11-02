import Header from "@/components/Header";
import EditNote from "@/components/EditNote";
import CreateNote from "@/components/CreateNote";
import NotesSection from "@/components/NotesSection";

const Notes = () => {
  return (
    <>
      <Header />
      <NotesSection />
      <CreateNote />
      <EditNote />
    </>
  );
};

export default Notes;
