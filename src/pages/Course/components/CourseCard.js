import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { Paper, Grid, Button, Box } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteIcon from "@mui/icons-material/Delete";
import { H1 } from "../../../components/Title";
import { formatTime, formatDate } from "../../../utils";
import { useQueryClient } from "@tanstack/react-query";
import { AUTHOR_QUERY } from "../../../queries";
function CourseCard({ course, role }) {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const authors = queryClient.getQueryData([
        AUTHOR_QUERY,
    ]);
    return (_jsx(Paper, { elevation: 2, className: "my-1 p-1", children: _jsxs(Grid, { container: true, spacing: 2, className: "p-5", children: [_jsxs(Grid, { item: true, md: 7, children: [_jsx(H1, { text: course.title }), _jsx("div", { className: "w-11/12 indent-2", children: course.description })] }), _jsxs(Grid, { item: true, md: 5, className: "flex-col justify-center", children: [_jsxs("div", { id: "author", className: "w-80 truncate", children: [_jsx("b", { children: "Authors:\u00A0\u00A0" }), course.authors.map((id) => authors?.result?.filter((author) => author.id === id)[0]?.name) + " "] }), _jsxs("div", { id: "durations", children: [_jsx("b", { children: "Duration:\u00A0\u00A0" }), `${formatTime(course.duration)} hours`] }), _jsxs("div", { id: "created", children: [_jsx("b", { children: "Created:\u00A0\u00A0" }), formatDate(String(course.creationDate))] }), _jsx("div", { id: "showCourseBtn", children: _jsx(Box, { className: "mt-5", children: _jsxs(Grid, { container: true, spacing: 1, children: [_jsx(Button, { variant: "outlined", color: "secondary", onClick: () => navigate(`/courses/${course.id}`), children: "Show Courses" }), _jsx(AdminPanel, { isShow: role === "admin", courseId: course.id })] }) }) })] })] }) }));
}
function AdminPanel({ isShow, courseId }) {
    const navigate = useNavigate();
    const handleDeleteCourseClick = (id) => { };
    return (_jsx(_Fragment, { children: isShow ? (_jsxs(_Fragment, { children: [_jsx(Grid, { item: true, children: _jsx(Button, { color: "secondary", onClick: () => handleDeleteCourseClick(courseId), children: _jsx(DeleteIcon, {}) }) }), _jsx(Grid, { item: true, children: _jsx(Button, { color: "secondary", onClick: () => navigate(`/courses/update/${courseId}`), children: _jsx(EditRoundedIcon, {}) }) })] })) : (_jsx("span", {})) }));
}
export default CourseCard;
