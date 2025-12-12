import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import App from './App.jsx'
import './index.css'
import { GlobalProvider } from './Context/GlobalContext.jsx';
import { PostProvider } from './Context/PostContext.jsx';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <GlobalProvider>
                <PostProvider>
                    <Toaster position="top-center" />
                    <App />
                </PostProvider>
            </GlobalProvider>
        </BrowserRouter>
    </StrictMode>
)
