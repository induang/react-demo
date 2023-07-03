import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/system";
import { Grid, Button } from "@mui/material";
import { formatTime } from "../../../utils";
import { H4, CH2, CH4 } from "../../../components/Title";
import InputField from "../../../components/InputField";
import { fetchAddAuthor, fetchAuthors } from "../../../services/author";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCourseById } from "../../../services/course";
import noti from "../../../utils/noti";
import { AUTHOR_QUERY, COURSE_QUERY } from "../../../queries";
import AuthorItem from "./AuthorItem";
const CourseForm = (props) => {
    let { values, handleSubmit, setValues } = props;
    let { courseId } = useParams();
    const queryClient = useQueryClient();
    const courseQuery = useQuery({
        queryKey: [COURSE_QUERY, courseId],
        queryFn: () => fetchCourseById(courseId),
        enabled: Boolean(courseId),
    });
    const authrosQuery = useQuery({
        queryKey: ["author"],
        queryFn: fetchAuthors,
    });
    const authors = authrosQuery.data?.result;
    const addAuthorMutation = useMutation({
        mutationFn: (name) => fetchAddAuthor(name),
        onSuccess: () => {
            noti({ type: "success", message: "Add Author Succeed." });
            queryClient.invalidateQueries([AUTHOR_QUERY]);
        },
    });
    useEffect(() => {
        if (courseId && courseQuery?.data)
            setValues(courseQuery?.data?.result);
    }, [courseId, courseQuery.data]);
    const handleCreateAuthorClick = () => {
        if (values.newAuthor === "") {
            noti({ type: "warning", message: "author name should not be empty." });
        }
        else {
            addAuthorMutation.mutate(values.newAuthor);
            addAuthorMutation.isSuccess &&
                noti({
                    type: "success",
                    message: "Add Author Succeed.",
                });
        }
    };
    const handleAuthorToCourseAuthorClick = (id) => {
        const newAuthors = [...(values.authors || []), id];
        setValues({
            ...values,
            authors: newAuthors,
        });
    };
    const handleCourseAuthorToAuthorClick = (id) => {
        const newAuthors = values.authors.filter((authorId) => authorId !== id);
        setValues({
            ...values,
            authors: newAuthors,
        });
    };
    return (_jsxs(Box, { p: 3, component: "form", onSubmit: handleSubmit, children: [_jsxs(Box, { children: [_jsx(H4, { text: "Title :" }), _jsxs(Grid, { container: true, className: "justify-between mb-6", children: [_jsx(Grid, { item: true, children: _jsx(InputField, { name: "title", label: "Title", "data-testid": "course-test-title" }) }), _jsx(Grid, { item: true, children: _jsx(Button, { variant: "outlined", color: "secondary", type: "submit", "data-testid": "course-test-save-btn", children: "save course" }) })] })] }), _jsxs(Box, { children: [_jsx(H4, { text: "Description :" }), _jsx(InputField, { fullWidth: true, multiline: true, rows: 5, name: "description", label: "Description", "data-testid": "course-test-description" })] }), _jsx(Box, { children: _jsxs(Grid, { container: true, spacing: 2, className: "justify-between", children: [_jsxs(Grid, { item: true, xs: 6, children: [_jsxs(Box, { children: [_jsx(CH2, { text: "Add Author" }), _jsx(H4, { text: "Author name :" }), _jsx(InputField, { label: "Author name", size: "small", fullWidth: true, name: "newAuthor" }), _jsx("div", { className: "table m-auto mt-8", children: _jsx(Button, { variant: "outlined", color: "secondary", onClick: handleCreateAuthorClick, children: "Create author" }) })] }), _jsxs(Box, { children: [_jsx(CH2, { text: "Duration" }), _jsx(H4, { text: "Duration :" }), _jsx(InputField, { label: "Duration", size: "small", fullWidth: true, name: "duration", "data-testid": "course-test-duration" }), _jsxs("div", { className: "text-3xl mt-8", children: ["Duration:\u00A0", _jsx("b", { children: values.duration === "" ? "0" : formatTime(values.duration) }), "\u00A0Hours"] })] })] }), _jsx(Grid, { item: true, xs: 6, className: "flex justify-center", children: _jsxs(Box, { children: [_jsx(CH4, { text: "Course Authors" }), _jsx("div", { children: values.authors?.map((id) => {
                                            const theAuthor = authors?.filter((author) => author.id === id)[0];
                                            return (_jsx(AuthorItem, { author: theAuthor || {}, buttonText: "Delete Author", handleClick: (event) => handleCourseAuthorToAuthorClick(id) }, id));
                                        }) }), _jsx(CH4, { text: "Authors" }), _jsx("div", { children: authors?.map((author) => !values.authors?.includes(author.id) && (_jsx(AuthorItem, { author: author, buttonText: "Add Author", handleClick: (event) => handleAuthorToCourseAuthorClick(author.id) }, author.id))) })] }) })] }) })] }));
};
export default CourseForm;
