import { Navigate } from "react-router-dom";

export default function HomeRedirect() {
  const user = localStorage.getItem("user");

  return user ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}
