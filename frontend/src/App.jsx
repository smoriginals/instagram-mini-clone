import { Route, Routes } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import React from 'react';
import Homescreen from './pages/Homescreen';
import Profilepage from "./pages/Profilepage";
import Navbar from './components/Navbar/Navbar';
import Bottombar from './components/Footer/Bottombar';
import Notfound from './pages/Notfound';
import Notifications from './pages/Notifications';
import Message from './pages/Message';
import Login from './pages/Login';
import Signup from './pages/Signup';
export default function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<Homescreen />} />
                <Route path='/profile' element={<Profilepage />} />
                <Route path='/notifications' element={<Notifications />} />
                <Route path='/messages' element={<Message />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />


                <Route path='*' element={<Notfound />} />
            </Routes>
            <Bottombar />
        </>
    )
}