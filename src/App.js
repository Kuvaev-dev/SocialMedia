import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Home, Profile, Register, Login, ResetPassword } from "./pages";

function Layout() {
  const user = null;
  const location = useLocation();

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

function App() {
  return (
    <div className="w-full min-h-[100vh]">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
        </Route>

        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/reset-password" element={<ResetPassword />}></Route>
      </Routes>
    </div>
  );
}

export default App;
