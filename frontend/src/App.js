import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/user/UserDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Orders from "./pages/admin/Orders";
import Account from "./pages/admin/Account";
import AdminLayout from "./components/AdminLayout";
import ProductList from "./pages/admin/ProductList";

// Protected Route untuk akses login
const PrivateRoute = ({ element }) => {
  const { user } = useContext(AuthContext);
  return user ? element : <Navigate to="/login" />;
};

// Redirect jika sudah login
const RedirectIfLoggedIn = ({ element }) => {
  const { user } = useContext(AuthContext);
  return user ? <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"} /> : element;
};

function App() {
  return (
    
    <Router>
      <AuthProvider>
        <Routes>
          {/* Halaman Login & Register */}
          <Route path="/login" element={<RedirectIfLoggedIn element={<Login />} />} />
          <Route path="/register" element={<RedirectIfLoggedIn element={<Register />} />} />

          {/* Halaman User */}
          <Route path="/user/dashboard" element={<PrivateRoute element={<UserDashboard />} />} />

          {/* Halaman Admin */}
          <Route path="/admin" element={<PrivateRoute element={<AdminLayout />} />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="produk" element={<ProductList />} />
            <Route path="orders" element={<Orders/>} />
            <Route path="account" element={<Account />} />
          </Route>

          {/* Redirect ke login jika tidak cocok */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
