import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import MainLayout from "../components/Layout/mainLayout";
import ProtectedRoute from "./ProtectedRoute";
import UserLayout from "../components/Layout/UserLayout";
import HomeRedirect from "./HomeRedirect";
import { lazy, Suspense } from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-lg font-semibold text-gray-600">
        Loading...
      </div>
    </div>
  );
};

export default function AppRoutes() {
  const Users = lazy(() => import('../pages/Users'));
  const Dashboard = lazy(() => import('../pages/Dashboard'));
  const AboutUs = lazy(() => import('../pages/AboutUs'));
  const Tc = lazy(() => import('../pages/TC'));
  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  );
}
