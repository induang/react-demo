import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { H2, H4 } from "../../components/Title";
import { useMutation } from "@tanstack/react-query";
import { fetchLogin } from "../../services/auth";
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const userLogin = useMutation({
        mutationFn: (loginer) => fetchLogin(loginer),
        onSuccess: (data) => {
            window.localStorage.setItem("user_token", data.result);
            window.localStorage.setItem("user_name", data.user.name);
        },
    });
    const handleLoginClick = () => {
        const loginer = {
            email: email,
            password: password,
        };
        userLogin.mutate(loginer);
    };
    userLogin.isSuccess && navigate("/courses");
    return (_jsxs(Box, { className: "flex flex-col w-96 m-auto gap-4", children: [_jsx(H2, { text: "Login" }), _jsx(H4, { text: "Email" }), _jsx(TextField, { variant: "outlined", label: "Enter email", size: "small", value: email, onChange: handleEmailChange }), _jsx("h4", { className: "text-lg font-semibold", children: "Password" }), _jsx(TextField, { variant: "outlined", label: "Enter Password", size: "small", type: "password", value: password, onChange: handlePasswordChange }), _jsx("p", { children: _jsx(Button, { variant: "outlined", color: "secondary", onClick: handleLoginClick, children: "Login" }) }), _jsxs("p", { children: ["If you not have an account you can", " ", _jsx(Link, { to: "/registration", className: "text-purple-600", children: "Registration" })] })] }));
}
export default Login;
