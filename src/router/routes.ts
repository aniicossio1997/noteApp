import { lazy } from "react";
import { NotFoundPage } from "../pages/NotFoundPage";
import { LoginPage } from "../auth/pages";

const AuthPage = lazy(() => import("../auth/routes/AuthRoutes"));
const JournalRoutes = lazy(() => import("../journal/routes/NoteRoutes"));

export enum BRoutes {
  HOME_NOTE = "/note",
  AUTH="/auth",

}

const routes = [
  {
    path: "/note",
    type: "private",
    hasSubroutes: true,
    element: JournalRoutes,
  },

  {
    type: "guest",
    path: "/auth",

    hasSubroutes: true,
    element: AuthPage,
  },
  {
    type: "guest",
    path: "/",
    element: LoginPage,
  },

  {
    path: "*",
    title: "Página no encontrada",
    element: NotFoundPage,
  },
];

export default routes;
