import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import AboutUs from "../pages/AboutUs";
import Tc from "../pages/TC";
import MainLayout from "../components/Layout/mainLayout";
import ProtectedRoute from "./ProtectedRoute";
import UserLayout from "../components/Layout/UserLayout";
import HomeRedirect from "./HomeRedirect";
import Users from "../pages/Users";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
         <Route path="/" element={<HomeRedirect />} />
        <Route path="/login" element={<Login />} />
            <Route path="/about_us" element={<AboutUs />} />
            <Route path="/tc" element={<Tc />} />
      </Route>

      <Route element={<UserLayout />}>  
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Route>
    </Routes>

  );
}
