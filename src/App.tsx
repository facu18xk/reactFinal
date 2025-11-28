import { Routes, Route, useNavigate } from 'react-router-dom';
import AuthPage from "@/features/auth/AuthPage";
import HomePage from './features/dashboard/HomePage';
import ProtectedRoute from './features/auth/ProtectedRoute';
import MainLayout from './layouts/MainLayout';
import { useAuth } from './features/auth/useAuth';

function App() {
  return (
    <Routes>

      <Route element={<MainLayout />}>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/dashboard" element={<div>Dashboard</div>} />
      </Route>

      <Route path="/login" element={<AuthPage />} />

    </Routes>
  );
}

export default App;
