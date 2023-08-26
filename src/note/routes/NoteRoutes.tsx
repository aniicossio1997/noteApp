import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { JournalLayout } from "../layout/JournalLayout";
import { CreateNote, NoteView, NothingSelectedView } from "../views";

import { NoteProvider } from "../../context/NoteContext";
import { store } from "../../redux";
import { Provider } from "react-redux";
import "../views/mediaQuery.css"
import { EditNote } from "../views/EditNote";
const NoteRoutes = () => {
  return (
    <>
      <Provider   store={ store }>
        <NoteProvider>
          <JournalLayout>
            <Routes>
              <Route path="create" element={<CreateNote />} />
              <Route path="edit" element={<EditNote />} />
              <Route path="" element={<NothingSelectedView />} />
              <Route path=":id" element={<NoteView />} />
              <Route path="*" element={<Navigate to={"/note"} />} />
            </Routes>
            <Outlet />
          </JournalLayout>
        </NoteProvider>
      </Provider >
    </>
  );
};
export default NoteRoutes;
