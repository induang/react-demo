import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Grid, Button } from "@mui/material";
import logo from "../assets/logo.jpg";
import { useMutation } from "@tanstack/react-query";
import { fetchLogout } from "../services/auth";
function Header() {
    const userName = window.localStorage.getItem("user_name");
    const currentPath = window.location.href;
    const navigate = useNavigate();
    const logoutMutation = useMutation({
        mutationFn: fetchLogout,
        onSuccess: () => {
            window.localStorage.removeItem("user_token");
            window.localStorage.removeItem("user_name");
            navigate("/login");
        },
    });
    const handleLOGOUTClick = () => {
        logoutMutation.mutate();
    };
    return (_jsx(Box, { m: 1, children: _jsxs(Grid, { container: true, className: "justify-between", children: [_jsx(Grid, { item: true, children: _jsx("img", { src: logo, alt: "logo", className: "w-24" }) }), _jsx(Grid, { item: true, children: currentPath.slice(0, -1) === String(window.location.origin) ||
                        currentPath.includes("login") ||
                        currentPath.includes("registration") ? (_jsx(_Fragment, {})) : (_jsxs(_Fragment, { children: [_jsx("span", { style: { fontSize: "20px" }, "data-testid": "test", children: userName }), _jsx("span", { className: `${userName ? "" : "invisible"}`, children: _jsx(Button, { variant: "outlined", color: "secondary", sx: { ml: "20px" }, onClick: handleLOGOUTClick, children: "LOGOUT" }) })] })) })] }) }));
}
export default Header;
