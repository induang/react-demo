import { jsx as _jsx } from "react/jsx-runtime";
import { Box, CircularProgress, Dialog, DialogContent } from "@mui/material";
export const Loading = () => {
    return (_jsx(Dialog, { disableEnforceFocus: true, open: true, id: "tool_loading", sx: { pointerEvents: "none" }, children: _jsx(DialogContent, { sx: { pointerEvents: "none" }, children: _jsx(Box, { className: "w-96 flex", children: _jsx(CircularProgress, { className: "m-auto my-5" }) }) }) }));
};
export default Loading;
