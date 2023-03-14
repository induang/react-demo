import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { fetchAuthorization } from "../services/auth";
import noti from "../utils/noti";

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const authQuery = useQuery({
    queryKey: ["auth"],
    queryFn: fetchAuthorization,
  });
  if (authQuery?.data?.result.role === "admin") return children;
  else {
    noti({
      type: "warning",
      message: "No access.",
    });
    return <Navigate to="/courses" replace />;
  }
}
