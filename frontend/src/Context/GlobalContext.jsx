import { createContext, useContext, useState } from "react";
import axios from 'axios';
import toast from 'react-hot-toast';
import API from "../lib/instance";
import { useEffect } from "react";

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


    // Create User Function
    const createUser = async (userData) => {

        if (!userData?.email || !userData?.password || !userData?.name || !userData?.username) {
            toast.error("All fields are required");
            return { ok: false, message: "Missing fields" };
        }

        const createPromise = axios.post("http://localhost:5000/api/user/create", userData)

        toast.promise(createPromise, {
            loading: 'Creating Acconut',
            success: 'Account Created',
            error: 'Failed to Create Account'
        })

        try {
            const res = await createPromise;

            if (!res.data.success) {
                return { ok: false, message: res.data?.message || "Signup failed" };
            }
            setUser(res.data.newUser);
            localStorage.setItem("user", JSON.stringify(res.data.newUser));

            return { ok: true, user: res.data.newUser };

        }
        catch (error) {
            return {
                ok: false,
                message: error.response?.data?.message || "Network Error"
            };

        }

    };

    // Login User Function
    const LoginUser = async (loginData) => {

        if (!loginData.email || !loginData.password) {
            toast.error("All fields are required");
            return { ok: false, message: "Missing fields" };
        }

        const loginPromise = axios.post("http://localhost:5000/api/user/login", loginData)

        toast.promise(loginPromise, {
            loading: 'Loggin...',
            success: 'Logged in',
            error: 'Failed to Login!'

        })
        try {

            const res = await loginPromise;
            if (!res.data.success) {

                return { ok: false, message: res.data.message }
            }
            setUser(res.data.user);
            localStorage.setItem('user', JSON.stringify(res.data.user))
            localStorage.setItem('token', res.data.token);
            return { ok: true, message: 'Login Success', user: res.data.user, token: res.data.token }
        } catch (error) {
            return {
                ok: false,
                message: error.response?.data?.message || 'Network Error'
            }
        }

    }

    // Logout User Function
    const LogoutUser = () => {
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.clear();
        toast.success("Logout Successfully");
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

        if (!_id) {
            return { ok: false, message: "User id missing" };
        }

        const deletePromise = API.delete("/api/user/deleteuser", { data: { _id } });

        toast.promise(deletePromise, {
            loading: 'Deleting Account',
            success: 'Account Deleted',
            error: 'Failed to Delete Account!'
        })
        try {
            const res = await deletePromise;
            if (res.data.success) {
                setUser(null);
                localStorage.removeItem('user');
            }
            return { ok: true, message: res.data.message }
        } catch (error) {
            return { ok: false, message: error.response?.data?.message || 'Network Error' }
        }

    }


    //Upload User Profile Picture
    const UploadProfilePicture = async (file, userId) => {

        try {
            const formData = new FormData();
            formData.append('image', file);
            formData.append("userId", userId);

            const res = await axios.post('http://localhost:5000/api/user/upload', formData, {
                headers: { "Content-Type": "multipart/form-data" }
            })

            if (res.data.success) {
                // IMPORTANT: update global user object
                //setUser(prev => ({
                //    ...prev,
                //    userProfile: res.data.url,
                //    userProfileId: res.data.user.userProfileId
                //}));
                setUser(prev => {
                    const updated = { ...prev, userProfile: res.data.url };
                    localStorage.setItem("user", JSON.stringify(updated));
                    return updated;
                });

            }

            return res.data;
            //return { ok: true, ...res.data };
        }
        catch (err) {
            return { ok: false, message: err.response?.data?.message || "Network Error" };
            //return { ok: false, message: "upload failed", err };
        }
    }

    //const FollowUnFollowUsers = async (targetToFollow) => {

    //    if (!user) return { success:false };

    //    const followPromise = API.put(`/api/user/follow/${targetToFollow}`);

    //    toast.promise(followPromise, {
    //        loading: 'Requesting...',
    //        success: 'Followed',
    //        error: 'Requesting Failed!'
    //    })

    //    try {

    //        const res = await followPromise;
    //        if (res?.data?.success) {

    //            setUser(prev => {
    //                if (!prev) return prev;
    //                const isFollowing = prev.following.includes(targetToFollow);
    //                return {
    //                    ...prev, following: isFollowing ? prev.following.filter(id => id !== targetToFollow) : [...prev.following, targetToFollow],
    //                }
    //            })

    //            setUser(prev => prev.map(u => u._id === targetToFollow ? { ...u, followers: res.data.action === 'followed' ? [...u.followers, user._id] : u.followers.filter(id => id !== user._id), } : u));

    //            localStorage.setItem('user', JSON.stringify(res.data.user));
    //            return res.data.user;
    //        }
    //    } catch (error) {
    //        return {ok:false,message:error.response?.data||error.message}
    //    }

    //}
    const FollowUnFollowUsers = async (targetUserId) => {
        if (!user) return { success: false };

        try {
            const res = await API.put(`/api/user/follow/${targetUserId}`);

            if (res.data.success) {
                // update logged-in user
                setUser(prev => {
                    if (!prev) return prev;

                    const isFollowing = prev.following.includes(targetUserId);

                    const updatedUser = {
                        ...prev,
                        following: isFollowing
                            ? prev.following.filter(id => id !== targetUserId)
                            : [...prev.following, targetUserId],
                    };

                    localStorage.setItem("user", JSON.stringify(updatedUser));
                    return updatedUser;
                });

                // update users list (followers count)
                setUsers(prev =>
                    prev.map(u =>
                        u._id === targetUserId
                            ? {
                                ...u,
                                followers:
                                    res.data.action === "followed"
                                        ? [...u.followers, user._id]
                                        : u.followers.filter(id => id !== user._id),
                            }
                            : u
                    )
                );

                return { success: true };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    };


    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await API.get('/api/smos/users');

                if (res?.data?.success) {
                    setUsers(res?.data?.users); // 👈 THIS ARRAY YOU SHARED
                }
                console.log(res.data.users)
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);


    return (
        <GlobalContext.Provider
            value={{
                storyDrawerOpen,
                OpenStoryDrawer,
                CloseStoryDrawer,
                createUser, user,
                LoginUser, LogoutUser, UpdateUserProfile, DeleteUser,
                UploadProfilePicture, users, loading,
                FollowUnFollowUsers
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
