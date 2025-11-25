import React from 'react';
import Navbar from '../components/Navbar/Navbar.jsx';
import Storybar from '../components/Navbar/Storybar.jsx';
import Feeds from '../components/Feeds/Feeds.jsx';
import Bottombar from '../components/Footer/Bottombar.jsx';
export default function Homescreen() {
    return (
        <>
           
            <Storybar />
            <Feeds />
            
        </>
    )
}