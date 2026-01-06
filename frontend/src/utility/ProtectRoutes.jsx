import { Navigate, Outlet, useLocation } from "react-router-dom";
export default function ProtectRoutes() {

    const token = localStorage.getItem("token");
    const location = useLocation();

    // Public routes allowed WITHOUT token
    const publicRoutes = ["/", "/login"];

    // If no token & trying to access protected route → redirect
    if (!token && !publicRoutes.includes(location.pathname)) {
        return <Navigate to="/login" replace />;
    }

    // If token & trying to access login/signup → redirect home
    if (token && publicRoutes.includes(location.pathname)) {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
}
