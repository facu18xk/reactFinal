import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 px-2 md:px-10 xl:px-26 pt-10">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
