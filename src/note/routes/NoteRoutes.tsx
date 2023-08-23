import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { JournalLayout } from "../layout/JournalLayout";
import { CreateNote, NoteView, NothingSelectedView } from "../views";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { supabaseApi } from "../../redux/slice/noteSlice";
import { NoteProvider } from "../../context/NoteContext";
const NoteRoutes = () => {
  return (
    <>
      <ApiProvider api={supabaseApi}>
        <NoteProvider>
          <JournalLayout>
            <Routes>
              <Route path="create" element={<CreateNote />} />
              <Route path="" element={<NothingSelectedView />} />
              <Route path=":id" element={<NoteView />} />
              <Route path="*" element={<Navigate to={"/note"} />} />
            </Routes>
            <Outlet />
          </JournalLayout>
        </NoteProvider>
      </ApiProvider>
    </>
  );
};
export default NoteRoutes;
