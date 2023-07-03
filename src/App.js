import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { QueryClientProvider, QueryClient, } from "@tanstack/react-query";
function App() {
    const queryClient = new QueryClient();
    return (_jsxs(QueryClientProvider, { client: queryClient, children: [_jsx(Header, {}), _jsx(Outlet, {})] }));
}
export default App;
