import { lazy } from "react";
import { NotFoundPage } from "../pages/NotFoundPage";
import { LoginPage } from "../auth/pages";

const AuthPage = lazy(() => import("../auth/routes/AuthRoutes"));
const NoteRoutes = lazy(() => import("../note/routes/NoteRoutes"));

export enum BRoutes {
  AUTH="/auth",
  HOME_NOTE = "/note",
  

}

const routes = [
  {
    path: "/note",
    type: "private",
    hasSubroutes: true,
    element: NoteRoutes,
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
