import React from 'react';
import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HomeIcon() {
    const navigate = useNavigate();
    return (
        <>
            <Home className="w-7 h-7 hover:scale-120 transition-all duration-300 ease-in-out" onClick={() => { navigate('/') }} />
        </>
    )
}