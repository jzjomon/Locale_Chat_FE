import { Navigate, Outlet } from "react-router-dom";

export const Authorization = () => {
    const token = localStorage.getItem('token');
    return (token ? <Outlet /> : <Navigate to="/" />)
} 

export const SignOutOrHome = () => {
    const token = localStorage.getItem("token");
    return (token ? <Navigate to="/home" /> : <Outlet />)
} 