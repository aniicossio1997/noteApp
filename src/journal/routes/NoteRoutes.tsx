import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { JournalLayout } from "../layout/JournalLayout";
import { CreateNote, NoteView, NothingSelectedView } from "../views";

const NoteRoutes = () => {
  return (
    <>
      <JournalLayout>
        <Routes>
          <Route path="create" element={<CreateNote />} />
          <Route path="" element={<NothingSelectedView />} />
          <Route path=":id" element={<NoteView />} />
          <Route path="*" element={<Navigate to={"/note"} />} />
        </Routes>
        <Outlet />
      </JournalLayout>
    </>
  );
};
export default NoteRoutes;
