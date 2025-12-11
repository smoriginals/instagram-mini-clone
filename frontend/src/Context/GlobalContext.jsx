import { createContext, useContext, useState } from "react";
import axios from 'axios';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    // Story Drawer Handle
    const [storyDrawerOpen, setStoryDrawerOpen] = useState(false);
    const CloseStoryDrawer = () => setStoryDrawerOpen(false);
    const OpenStoryDrawer = () => setStoryDrawerOpen(true);

    // User Profile State Management
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

    //User Post State Management
    //const [userPost, setUserPost] = useState(() => {
    //    const storeUserPosts = localStorage.get('userposts');
    //    try {
    //        return storeUserPosts ? JSON.parse(storeUserPosts) : null;
    //    }
    //    catch {
    //        localStorage.removeItem('userposts');
    //    }
    //    console.log(userPost);
    //})


    // Create User Function
    const createUser = async (userData) => {
        try {
            const res = await axios.post(
                "http://localhost:5000/api/user/create",
                userData
            );
            console.log(res);
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

            return { ok: true, user: res.data.user };
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
    // Delete User function
    const DeleteUser = async (_id) => {
        try {
            const res = await axios.delete("http://localhost:5000/api/user/deleteuser", { data: { _id } });
            setUser(null);
            localStorage.removeItem('user');
            return { ok: true, user: res.data.message };
        }
        catch (error) {
            return { ok: false, message: error.response?.data?.message || "Network Error" };
        }
    }
    //Upload User Profile Picture

    const UploadProfilePicture = async (file, userId) => {

        try {
            console.log("file data:", file)
            console.log("user data:", userId)

            const formData = new FormData();
            formData.append('image', file);
            formData.append("userId", userId);

            const res = await axios.post('http://localhost:5000/api/user/upload', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })

            if (res.data.success) {
                // IMPORTANT: update global user object
                setUser(prev => ({
                    ...prev,
                    userProfile: res.data.url,
                    userProfileId: res.data.user.userProfileId
                }));
            }

            return res.data;
            //return { ok: true, ...res.data };
        }
        catch (err) {
            return { ok: false, message: err.response?.data?.message || "Network Error" };
            //return { ok: false, message: "upload failed", err };
        }
    }

    //User creating a Post
    const AddUserPost = async (postData) => {
        try {
            const res = await axios.post('http://localhost:5000/api/user/post/create', postData);
            console.log(res);
            
        }
        catch (error) {
            console.log("Unable to make Post, Server error:",error.message)
        }
    }
    AddUserPost();
    createUser();
    console.log(user);

    return (
        <GlobalContext.Provider
            value={{
                storyDrawerOpen,
                OpenStoryDrawer,
                CloseStoryDrawer,
                createUser, user,
                LoginUser, LogoutUser, UpdateUserProfile, DeleteUser,
                UploadProfilePicture,
                AddUserPost
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
