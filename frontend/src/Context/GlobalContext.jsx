import { createContext, useContext, useState } from "react";
import axios from 'axios';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    //========Story Drawer Handle=================================
    const [storyDrawerOpen, setStoryDrawerOpen] = useState(false);
    const CloseStoryDrawer = () => setStoryDrawerOpen(false);
    const OpenStoryDrawer = () => setStoryDrawerOpen(true);
    //============================================================


    //================ User State Management =====================
    //const [user, setUser] = useState(
    //    JSON.parse(localStorage.getItem("user"))||null
    //);

    const [user, setUser] = useState(() => {
        const storeUser = localStorage.getItem('user');
        try {
            return storeUser ? JSON.parse(storeUser) : null;
        }
        catch {
            localStorage.removeItem('user');
            return null;
        }
    })
    //============================================================

    // Create User Function
    const createUser = async (userData) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/user/create",
                userData
            );

            setUser(res.data.newUser);
            localStorage.setItem("user", JSON.stringify(res.data.newUser));
            return { ok: true, user: res.data.newUser };

        } catch (error) {
            return { ok: false, message: error.response?.data?.message || "Network Error" };
        }
    };

    // Login User Function
    const LoginUser = async (loginData) => {
        try {
            const res = await axios.post("http://localhost:5000/api/user/login", loginData);
            // ❗ Save logged-in user here
            setUser(res.data.user);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            return { ok: true, user:res.data.user};
            //return { ok: true, data: res.data };
        }
        catch (error) {
            return { ok: false, message: error.response?.data?.message || "Network Error" };
        }
    }

    // Logout User Function
    const LogoutUser = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    //Update User profile function
    const UpdateUserProfile = async (updatedData) => {
        try {
            const res = await axios.put("http://localhost:5000/api/user/updateProfile", updatedData);
            setUser(res.data.updatedUser);
            localStorage.setItem("user", JSON.stringify(res.data.updatedUser));
            return { ok: true, user: res.data.updatedUser };
        } catch (error) {
            return { ok: false, message: error.response?.data?.message || "Network Error" };
        }
    }

    const DeleteUser = async (_id) => {
        try {
            const res = await axios.delete("http://localhost:5000/api/user/deleteuser", { data: {_id}});
            setUser(null);
            localStorage.removeItem('user');
            return { ok: true, user: res.data.message};
        }
        catch (error) {
            return { ok: false, message: error.response?.data?.message || "Network Error" };
        }
    }


    console.log('Global Provider is Running');
    console.table(user)
    return (
        <GlobalContext.Provider
            value={{
                storyDrawerOpen,
                OpenStoryDrawer,
                CloseStoryDrawer,
                createUser, user,
                LoginUser, LogoutUser, UpdateUserProfile, DeleteUser
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
