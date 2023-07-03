import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Link, useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { Grid, Paper } from "@mui/material";
import { formatDate, formatTime } from "../../utils";
import { H1 } from "../../components/Title";
import { fetchCourseById } from "../../services/course";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { AUTHOR_QUERY, COURSE_QUERY } from "../../queries";
function CourseInfo() {
    let { courseId } = useParams();
    const courseQuery = useQuery({
        queryKey: [COURSE_QUERY, courseId],
        queryFn: () => fetchCourseById(courseId),
    });
    const course = courseQuery?.data?.result;
    const queryClient = useQueryClient();
    const authors = queryClient.getQueryData([
        AUTHOR_QUERY,
    ]);
    return (_jsxs(Box, { p: 3, children: [_jsxs(Link, { to: "/courses", children: ["<", " Back to courses"] }), _jsxs(Paper, { className: "my-2 p-2", children: [_jsx(H1, { text: String(course?.title) }), _jsxs(Grid, { container: true, spacing: 2, children: [_jsx(Grid, { item: true, md: 7, children: _jsx("div", { className: "p-2", children: _jsx("p", { children: "long description..." }) }) }), _jsxs(Grid, { item: true, md: 5, children: [_jsxs("div", { id: "courseId", children: [_jsx("b", { children: "ID:\u00A0\u00A0" }), _jsx("span", { children: course?.id })] }), _jsxs("div", { id: "duration", children: [_jsx("b", { children: "Duration:\u00A0\u00A0" }), _jsx("span", { children: formatTime(Number(course?.duration)) + " hours" })] }), _jsxs("div", { id: "created", children: [_jsx("b", { children: "Created:\u00A0\u00A0" }), _jsx("span", { children: formatDate(String(course?.creationDate)) })] }), _jsxs("div", { id: "authors", children: [_jsx("b", { children: "Authors:\u00A0\u00A0" }), _jsx("div", { className: "ml-2", children: course?.authors?.map((id) => (_jsx("div", { children: authors?.result?.filter((author) => author.id === id)[0].name }, id))) })] })] })] })] })] }));
}
export default CourseInfo;
