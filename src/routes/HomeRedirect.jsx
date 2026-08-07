import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";


export default function HomeRedirect() {
  const token = Cookies.get("accessToken");
  
  return token ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}
