import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from "@mui/system";
import AuthorItem from "./AuthorItem";
import { CH4 } from "../../../components/Title";
function AuthorSection({ currentAuthors, handleAddAuthorClick, courseAuthors, handleDeleteAuthorClick, }) {
    return (_jsxs(Box, { children: [_jsx(CH4, { text: "Authors" }), _jsx("div", { children: currentAuthors && currentAuthors.length ? (currentAuthors.map((author) => (_jsx(AuthorItem, { author: author, buttonText: "add author", handleClick: () => handleAddAuthorClick(author.id) }, author.id)))) : (_jsx("span", { children: "Loading..." })) }), _jsx(CH4, { text: "Course Authors" }), _jsx("div", { children: courseAuthors && courseAuthors.length ? (courseAuthors.map((courseAuthor) => {
                    return (_jsx(AuthorItem, { author: courseAuthor, buttonText: "delete author", handleClick: () => handleDeleteAuthorClick(courseAuthor.id) }, courseAuthor.id));
                })) : (_jsx("span", { children: "Waiting..." })) })] }));
}
export default AuthorSection;
