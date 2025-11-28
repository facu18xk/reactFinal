import { Routes, Route, useNavigate } from "react-router-dom";
import AuthPage from "@/features/auth/AuthPage";
import HomePage from "./features/dashboard/HomePage";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import { useAuth } from "./features/auth/useAuth";
import Customers from "./pages/Customers";
import Products from "./pages/Products";

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/products" element={<Products />} />
        </Route>
      </Route>
      <Route path="/login" element={<AuthPage />} />
    </Routes>
  );
}

export default App;
