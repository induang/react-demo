import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import router from "./routes";
ReactDOM.createRoot(document.getElementById("root")).render(_jsxs(React.StrictMode, { children: [_jsx(RouterProvider, { router: router }), _jsx(ToastContainer, {})] }));
