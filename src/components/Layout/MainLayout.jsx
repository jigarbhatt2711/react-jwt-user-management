import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const MainLayout = () => {
  return (
    <>
      <Header/>

      <main className="min-h-screen bg-gray-50">
        <Outlet />
      </main>

      <Footer />
    </>
  );
};

export default MainLayout;