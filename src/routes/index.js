import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import RequireAuth from "./PrivateRoute";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import Course from "../pages/Course";
import CourseForm from "../pages/CourseForm";
import CourseInfo from "../pages/CourseInfo";
const requireCourseForm = (children) => (_jsx(RequireAuth, { children: children }));
const router = createBrowserRouter([
    {
        path: "/",
        element: _jsx(App, {}),
        children: [
            { index: true, element: _jsx(Login, {}) },
            {
                path: "registration",
                element: _jsx(Registration, {}),
            },
            {
                path: "login",
                element: _jsx(Login, {}),
            },
            {
                path: "courses",
                element: _jsx(Course, {}),
            },
            {
                path: "courses/:courseId",
                element: _jsx(CourseInfo, {}),
            },
            {
                path: "courses/add",
                element: requireCourseForm(_jsx(CourseForm, {})),
            },
            {
                path: "courses/update/:courseId",
                element: requireCourseForm(_jsx(CourseForm, {})),
            },
        ],
    },
]);
export default router;
