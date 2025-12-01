import React, { useEffect,useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Button } from "@/components/ui/button"
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

export default function App() {

    const [mode, setMode] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        if (mode === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem("theme", mode);
    }, [mode]);


    const location = useLocation();
    const hideComponentsOnThisRoutes = ['/login', '/', '/admin', '/settings','/smos'];
    const shouldHideComponents = hideComponentsOnThisRoutes.includes(location.pathname);

    return (
        <>
            {!shouldHideComponents && <Navbar />}
            
            <Routes>

                <Route path="/" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path='/home' element={<Homescreen />} />
                <Route path='/profile' element={<Profilepage />} />
                <Route path='/notifications' element={<Notifications />} />
                <Route path='/messages' element={<Message />} />
                <Route path='/settings' element={<Settings mode={mode} setMode={setMode}  />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path='/admin' element={<Admin/> }/>
                <Route path='/smos' element={<Secure/> }/>
                <Route path='*' element={<Notfound />} />
            </Routes>
            {!shouldHideComponents&& < Bottombar />}
        </>
    )
}