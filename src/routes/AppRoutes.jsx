import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Settings from "../pages/Settings";
import Statistics from "../pages/Statistics";
import Extensions from "../pages/Extensions";
import Automation from "../pages/Automation";
import ForgotPassword from "../pages/ForgotPassword";
import Layout from "../components/layout/Layout";

const RootRedirect = () => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" replace /> : <Navigate to="/login" replace />;
};

const AuthRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" replace /> : children;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH ROUTES (no layout) */}
        <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
        <Route path="/signup" element={<AuthRoute><Signup /></AuthRoute>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* APP WITH LAYOUT (protected) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* CHILD ROUTES at root level */}
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="extensions" element={<Extensions />} />
          <Route path="automation" element={<Automation />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<RootRedirect />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;