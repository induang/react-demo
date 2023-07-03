import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import { Button, TextField } from "@mui/material";
import { H2, H4 } from "../../components/Title";
function Registration() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let navigate = useNavigate();
    const handleNameChange = (e) => setName(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleRegistrationClick = async () => {
        const newUser = {
            name: name,
            password: password,
            email: email,
        };
    };
    return (_jsxs(Box, { className: "flex flex-col w-96 m-auto gap-4", children: [_jsx(H2, { text: "Registration" }), _jsx(H4, { text: "Name" }), _jsx(TextField, { variant: "outlined", label: "Enter name", size: "small", value: name, onChange: handleNameChange }), _jsx(H4, { text: "Email" }), _jsx(TextField, { error: email.length > 0 &&
                    // eslint-disable-next-line no-useless-escape
                    !email.match(/^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/), variant: "outlined", label: "Enter email", size: "small", value: email, onChange: handleEmailChange }), _jsx(H4, { text: "Password" }), _jsx(TextField, { variant: "outlined", label: "Enter password", size: "small", type: "password", value: password, onChange: handlePasswordChange }), _jsx("p", { children: _jsx(Button, { variant: "outlined", color: "secondary", onClick: handleRegistrationClick, children: "Registration" }) }), _jsxs("p", { children: ["If you have an account you can", " ", _jsx(Link, { to: "/login", className: "text-purple-600", children: "Login" })] })] }));
}
export default Registration;
