import React, { } from 'react';
import { Route, Routes } from 'react-router-dom';
import Homescreen from './pages/Homescreen';
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
import Privacy from './pages/Privacy';
import MyPosts from './components/Profile/MyPosts';
import DownloadData from './pages/DownloadData';
import Shild from './components/Shild/Shild';
import ExploreUsers from './pages/ExploreUsers';

export default function App() {

    //const navigate = useNavigate();

    const location = useLocation();
    const hideComponentsOnThisRoutes = ['/login', '/', '/admin', '/settings', '/smos', '/dashboard', '/editprofile', '/privacy', '/myposts', '/download', '/explore-users'];
    const shouldHideComponents = hideComponentsOnThisRoutes.includes(location.pathname);


    return (
        <>
            {!shouldHideComponents && <Navbar />}

            <Routes>

                <Route path="/" element={<Signup />} />
                <Route path="/login" element={<Login />} />

                <Route element={<Shild />}>

                    <Route path='/home' element={<Homescreen />} />
                    <Route path='/editprofile' element={<UserProfile />} />
                    <Route path='/notifications' element={<Notifications />} />
                    <Route path='/messages' element={<Message />} />
                    <Route path='/myposts' element={<MyPosts />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path='/privacy' element={<Privacy />} />
                    <Route path='/download' element={<DownloadData />} />
                    <Route path='/admin' element={<Admin />} />
                    <Route path='/smos' element={<Secure />} />
                    <Route path='/explore-users' element={<ExploreUsers/> }/>
                    <Route path='*' element={<Notfound />} />
                </Route>
            </Routes>
            {!shouldHideComponents && < Bottombar />}
        </>
    )
}