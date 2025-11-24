import { Route, Routes } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import React from 'react';
import Homescreen from './pages/Homescreen';
import Profilepage from "./pages/Profilepage";
import Navbar from './components/Navbar/Navbar';
import Bottombar from './components/Footer/Bottombar';
import Notfound from './pages/Notfound';
export default function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/' element={<Homescreen />} />
                <Route path='/profile' element={<Profilepage />} />
                <Route path='*' element={<Notfound />} />
            </Routes>
            <Bottombar />
        </>
    )
}