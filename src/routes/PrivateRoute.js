import { jsx as _jsx } from "react/jsx-runtime";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { fetchAuthorization } from "../services/auth";
import noti from "../utils/noti";
export default function PrivateRoute({ children }) {
    const authQuery = useQuery({
        queryKey: ["auth"],
        queryFn: fetchAuthorization,
    });
    if (authQuery?.data?.result.role === "admin")
        return children;
    else {
        noti({
            type: "warning",
            message: "No access.",
        });
        return _jsx(Navigate, { to: "/courses", replace: true });
    }
}
