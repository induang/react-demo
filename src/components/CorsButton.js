import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from "@mui/material";
import axios from "axios";
export default () => {
    const handleClick = () => {
        axios
            .get("http://localhost:3003/api/user", {
            headers: {
                Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2VsZW5hIiwiYWdlIjozMCwiaWF0IjoxNjc4MzI2OTY4LCJleHAiOjE2NzgzMjc1Njh9.lIUyVPJmhhzUMLrjprTQYBupTtNc-Bxq1YmajeEbGuk",
            },
        })
            .then((data) => {
            console.log("data: ", data);
        })
            .catch((error) => {
            console.log("error: ", error);
        });
    };
    return (_jsx(Button, { variant: "contained", onClick: handleClick, children: "Send Cors Request" }));
};
