import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import './App.css'
import AppRoutes from "./routes/AppRoutes";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { apiService } from "./services/apiService";
import { setUser } from "./redux/slices/authSlice";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const token = Cookies.get("accessToken");
      
      if (!token) return;

      try {
        const response = await apiService({
          method: "GET",
          url: "/auth/me",
        });

        dispatch(setUser(response.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchCurrentUser();
  }, [dispatch]);

  return (
    <>
      <AppRoutes />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
      />
    </>
  );
}

export default App