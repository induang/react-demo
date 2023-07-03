import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Grid } from "@mui/material";
function AuthorItem({ author, buttonText, handleClick }) {
    return (_jsxs(Grid, { container: true, className: "mt-2.5", children: [_jsx(Grid, { item: true, className: "w-48", children: author.name }), _jsx(Grid, { item: true, children: _jsx(Button, { variant: "outlined", color: "secondary", onClick: handleClick, children: buttonText }) })] }));
}
export default AuthorItem;
