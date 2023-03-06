import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import RequireAuth from "./PrivateRoute";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import Login from "../pages/Login";
import React from "react";
import Registration from "../pages/Registration";
import Course from "../pages/Course";

const requireCourseForm = (children: ReactJSXElement) => (
  <RequireAuth>{children}</RequireAuth>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Login /> },
      {
        path: "registration",
        element: <Registration />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "courses",
        element: <Course />,
      },
    ],
  },
]);

export default router;
