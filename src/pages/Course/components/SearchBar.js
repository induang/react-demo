import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Paper, IconButton, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
function SearchBar({ handleSearch }) {
    const handleChange = (e) => {
        handleSearch(e.target.value);
    };
    return (_jsxs(Paper, { component: "form", className: "flex items-center w-96 py-0.5 px-1", children: [_jsx(InputBase, { className: "w-full ml-2 flex", placeholder: "Enter course name...", onChange: handleChange }), _jsx(IconButton, { type: "button", "aria-label": "search", className: "p-2.5", children: _jsx(SearchIcon, {}) })] }));
}
export default SearchBar;
