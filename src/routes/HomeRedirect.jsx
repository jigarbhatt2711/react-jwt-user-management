import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function HomeRedirect() {
  const user = useSelector((state) => state.auth.user);

  return user ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}
