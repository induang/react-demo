import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import { Button, Grid } from "@mui/material";
import SearchBar from "./components/SearchBar";
import CourseCard from "./components/CourseCard";
import { useQuery } from "@tanstack/react-query";
import { fetchCourses } from "../../services/course";
import { fetchAuthors } from "../../services/author";
import { fetchAuthorization } from "../../services/auth";
import { AUTHOR_QUERY, AUTH_QUERY, COURSE_QUERY } from "../../queries";
const Course = () => {
    const courses = useQuery({
        queryKey: [COURSE_QUERY],
        queryFn: fetchCourses,
    });
    const authorsQuery = useQuery({
        queryKey: [AUTHOR_QUERY],
        queryFn: fetchAuthors,
    });
    const authenQuery = useQuery({
        queryKey: [AUTH_QUERY],
        queryFn: fetchAuthorization,
    });
    const role = authenQuery?.data?.result.role || "";
    // function courseFilter(course: ICourseDetail, value: string) {
    //   return (
    //     course.title.toLowerCase().search(new RegExp(value, "i")) !== -1 ||
    //     course.id.search(value) !== -1
    //   );
    // }
    if (courses.isLoading)
        return _jsx(_Fragment, { children: "Loading..." });
    function handleSearch(value) { }
    return (_jsxs(Box, { padding: 3, children: [_jsxs(Grid, { container: true, className: "justify-between", children: [_jsx(Grid, { item: true, children: _jsx(SearchBar, { handleSearch: handleSearch }) }), _jsx(Grid, { item: true, children: _jsx(Link, { to: "add", children: _jsx(Button, { variant: "outlined", color: "secondary", children: "Add new course" }) }) })] }), _jsx(Box, { children: courses.data?.result?.map((course) => (_jsx(CourseCard, { course: course, role: role }, course.id))) })] }));
};
export default Course;
