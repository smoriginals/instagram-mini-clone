import { createContext, useContext, useState } from "react";
import axios from 'axios';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    const [storyDrawerOpen, setStoryDrawerOpen] = useState(false);
    const OpenStoryDrawer = () => setStoryDrawerOpen(true);
    const CloseStoryDrawer = () => setStoryDrawerOpen(false);

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user"))
    );

    const createUser = async (userData) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/user/create",
                userData
            );

            console.log("Response received from server:", res.data);

            setUser(res.data.newUser);
            localStorage.setItem("user", JSON.stringify(res.data.newUser));

            return { ok: true, user: res.data.newUser };

        } catch (error) {
            console.error("Signup Error:", error);
            return { ok: false, message: error.response?.data?.message || "Network Error" };
        }
    };

    console.log('Global Provider is Running');
    return (
        <GlobalContext.Provider
            value={{
                storyDrawerOpen,
                OpenStoryDrawer,
                CloseStoryDrawer,
                createUser, user
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};


// eslint-disable-next-line react-refresh/only-export-components
export function useGlobal() {
    return useContext(GlobalContext);
}
