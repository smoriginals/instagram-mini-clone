import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    //GlobalProvider this name is used to wrap the entire app in main.jsx

    // --------------------
    // AUTH / USER
    // --------------------
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // --------------------
    // UI CONTROLS
    // --------------------
    const [showNavbar, setShowNavbar] = useState(true);
    const [openStoryDrawer, setOpenStoryDrawer] = useState(false);
    const [openCreatePostDrawer, setOpenCreatePostDrawer] = useState(false);

    // --------------------
    // POSTS / STORIES DATA
    // --------------------
    const [posts, setPosts] = useState([]);
    const [stories, setStories] = useState([]);

    // --------------------
    // GLOBAL LOADING & ERRORS
    // --------------------
    const [loading, setLoading] = useState(false);
    const [globalError, setGlobalError] = useState(null);

    // --------------------
    // API WRAPPER FUNCTION
    // --------------------
    const apiRequest = async (callback) => {
        try {
            setLoading(true);
            setGlobalError(null);
            const result = await callback();
            return result;
        } catch (err) {
            console.log("API Error:", err);
            setGlobalError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <GlobalContext.Provider
            value={{
                // AUTH
                user, setUser,
                isLoggedIn, setIsLoggedIn,

                // UI
                showNavbar, setShowNavbar,
                openStoryDrawer, setOpenStoryDrawer,
                openCreatePostDrawer, setOpenCreatePostDrawer,

                // DATA
                posts, setPosts,
                stories, setStories,

                // GLOBAL STATES
                loading,
                globalError,

                // UTILS
                apiRequest
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useGlobal = () => useContext(GlobalContext);
