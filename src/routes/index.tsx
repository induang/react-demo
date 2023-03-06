import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import RequireAuth from "./PrivateRoute";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import Login from "../pages/Login";

const requireCourseForm = (children: ReactJSXElement) => (
  <RequireAuth>{children}</RequireAuth>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [{ index: true, element: <Login /> }],
  },
]);

export default router;
