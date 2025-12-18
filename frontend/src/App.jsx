import React, {  } from 'react';
import { Route, Routes } from 'react-router-dom';
import Homescreen from './pages/Homescreen';
import Profilepage from "./pages/Profilepage";
import Navbar from './components/Navbar/Navbar';
import Bottombar from './components/Footer/Bottombar';
import Notfound from './pages/Notfound';
import Notifications from './pages/Notifications';
import Message from './pages/Message';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import { useLocation } from 'react-router-dom';
import Secure from './pages/Secure';
import UserProfile from './components/Profile/UserProfile';

export default function App() {

   
    const location = useLocation();
    const hideComponentsOnThisRoutes = ['/login', '/', '/admin', '/settings', '/smos', '/dashboard','/editprofile'];
    const shouldHideComponents = hideComponentsOnThisRoutes.includes(location.pathname);

    return (
        <>
            {!shouldHideComponents && <Navbar />}
            
            <Routes>

                <Route path="/" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path='/home' element={<Homescreen />} />
                <Route path='/profile' element={<Profilepage />} />
                <Route path='/editprofile' element={<UserProfile/> }/>
                <Route path='/notifications' element={<Notifications />} />
                <Route path='/messages' element={<Message />} />
                <Route path='/settings' element={<Settings />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path='/admin' element={<Admin/> }/>
                <Route path='/smos' element={<Secure/> }/>
                <Route path='*' element={<Notfound />} />
            </Routes>
            {!shouldHideComponents&& < Bottombar />}
        </>
    )
}