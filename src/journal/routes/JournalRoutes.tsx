import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";

const JournalRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Outlet/>
    </>
  );
};
export default JournalRoutes;
