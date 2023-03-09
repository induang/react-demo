import { Navigate } from "react-router-dom";
import { RootState } from "../types/store.type";
import { useAppSelector } from "../redux/store/hooks";
import React from "react";

export default function Auth({ children }: { children: JSX.Element }) {
  const user = useAppSelector((state: RootState) => state.user);
  const accessRole = user.role;
  if (accessRole === "admin") {
    return children;
  } else {
    return <Navigate to="/courses" replace />;
  }
}
