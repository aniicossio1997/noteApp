import { lazy } from "react";
import { NotFoundPage } from "../pages/NotFoundPage";
import { LoginPage } from "../auth/pages";

const AuthPage = lazy(() => import("../auth/routes/AuthRoutes"));
const NotePage = lazy(() => import("../journal/routes/JournalRoutes"));

export enum BRoutes {
  HOME_NOTE = "/note",
  SIGNUP = "/auth/register",
  LOGIN = "/auth/login",
}

const routes = [
  {
    path: "/note",
    type: "private",

    element: NotePage,
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
    type: "any",
    title: "Página no encontrada",
    element: NotFoundPage,
  },
];

export default routes;
