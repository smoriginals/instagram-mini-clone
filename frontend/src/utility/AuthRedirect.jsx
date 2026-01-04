import { Navigate, Outlet } from 'react-router-dom';

export default function AuthRedirect() {

    const token = localStorage.getItem('token');

    if (token) {
        return <Navigate to='/home' replace/>
    }

    return <Outlet/>
}