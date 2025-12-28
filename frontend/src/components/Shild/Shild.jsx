import { Navigate, Outlet } from 'react-router-dom';
import { useGlobal } from '../../Context/GlobalContext';

export default function Shild() {
    const { user } = useGlobal();
    if (!user) return <Navigate to='/login' replace />
    return <Outlet/>;
}