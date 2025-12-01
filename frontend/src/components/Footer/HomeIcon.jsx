import React from 'react';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HomeIcon() {
    const navigate = useNavigate();

    return (
        <>
            <Home className="h-7 w-7 transition-all duration-300 ease-in-out hover:scale-120" onClick={() => { navigate('/home') }} />
        </>
    )
}