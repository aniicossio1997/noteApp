import {   Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { JournalLayout } from "../layout/JournalLayout";
import { NoteView } from "../views";

const NoteRoutes = () => {
  return (
    <>
    <JournalLayout>
hello- text
<br/>
<Routes>
      <Route path='/:id' element={<NoteView/> }  />
      <Route path='' element={<HomePage/>} />
      <Route path='/*' element={<Navigate to={"/note/:id"} /> } />
      
   </Routes>
    </JournalLayout>

    </>
  );
};
export default NoteRoutes;
