import { createContext, useContext, useState } from "react";
import toast from 'react-hot-toast';
import API from "../lib/instance";
import { useEffect } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

    const LOCAL_HOST = import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_LIVE;

    // Story Drawer Handle
    const [storyDrawerOpen, setStoryDrawerOpen] = useState(false);
    const CloseStoryDrawer = () => setStoryDrawerOpen(false);
    const OpenStoryDrawer = () => setStoryDrawerOpen(true);

    // User Profile State Management

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');

        if (!storedUser) return null;

        try {
            return JSON.parse(storedUser);
        } catch (err) {
            console.error("Invalid user data in localStorage", err);
            localStorage.removeItem('user');
            return null;
        }
    });


    // Create User Function
    const createUser = async (userData) => {

        if (!userData?.email || !userData?.password || !userData?.name || !userData?.username) {
            toast.error("All fields are required");
            return { ok: false, message: "Missing fields" };
        }

        const createPromise = API.post('/api/user/create', userData)

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
            //setUser(res.data.user);
            //localStorage.setItem("user", JSON.stringify(res.data.user));

            return {
                ok: true,
                user: res.data.user
            };

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

        const loginPromise = API.post("/api/user/login", loginData)

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
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.clear();
        toast.success("Logout Successfully");
        setUser(null);
    };

    //Update User profile function
    const UpdateUserProfile = async (updatedData) => {

        try {
            const res = await API.put("/api/user/updateProfile", updatedData);
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
            return { ok: false, message: "User missing" };
        }

        const deletePromise = API.delete("/api/user/deleteuser", { data: { _id } });

        toast.promise(deletePromise, {
            loading: 'Deleting Account',
            success: 'Account Deleted',
            error: 'Failed to Delete Account!'
        })
        try {
            const res = await deletePromise;
            if (res?.data?.success) {
                setUser(null);
                setUsers([]);
                localStorage.clear();
                //localStorage.removeItem('token');
                //localStorage.removeItem('user');
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

            const res = await API.post('/api/user/upload', formData, {
                //headers: { "Content-Type": "multipart/form-data" }
            })

            if (res.data.success) {
                
                setUser(prev => {
                    const updated = { ...prev, userProfile: res.data.url };
                    localStorage.setItem("user", JSON.stringify(updated));
                    return updated;
                });

            }

            return res.data;
        }
        catch (err) {
            return { ok: false, message: err.response?.data?.message || "Network Error" };
            
        }
    }

    //const FollowUnFollowUsers = async (targetUserId) => {
    //    if (!user) return { success: false };

    //    try {
    //        const res = await API.put(`/api/user/follow/${targetUserId}`);

    //        if (res.data.success) {
    //            // update logged-in user
    //            setUser(prev => {
    //                if (!prev) return prev;

    //                const isFollowing = prev.following.includes(targetUserId);

    //                const updatedUser = {
    //                    ...prev,
    //                    following: isFollowing
    //                        ? prev.following.filter(id => id !== targetUserId)
    //                        : [...prev.following, targetUserId],
    //                };

    //                localStorage.setItem("user", JSON.stringify(updatedUser));
    //                return updatedUser;
    //            });

    //            // update users list (followers count)
    //            setUsers(prev =>
    //                prev.map(u =>
    //                    u._id === targetUserId
    //                        ? {
    //                            ...u,
    //                            followers:
    //                                res.data.action === "followed"
    //                                    ? [...u.followers, user._id]
    //                                    : u.followers.filter(id => id !== user._id),
    //                        }
    //                        : u
    //                )
    //            );

    //            return { success: true };
    //        }
    //    } catch (error) {
    //        return { success: false, message: error.message };
    //    }
    //};
    const FollowUnFollowUsers = async (targetUserId) => {
        if (!user?._id || !targetUserId) return;

        try {
            const res = await API.put(`/api/user/follow/${targetUserId}`);

            if (!res.data.success) return;

            setUser(prev => {
                if (!prev) return null;

                const following = Array.isArray(prev.following) ? prev.following : [];
                const isFollowing = following.includes(targetUserId);

                const updatedUser = {
                    ...prev,
                    following: isFollowing
                        ? following.filter(id => id !== targetUserId)
                        : [...following, targetUserId],
                };

                localStorage.setItem("user", JSON.stringify(updatedUser));
                return updatedUser;
            });

            setUsers(prev =>
                prev.map(u => {
                    if (u._id !== targetUserId) return u;

                    const followers = Array.isArray(u.followers) ? u.followers : [];
                    return {
                        ...u,
                        followers: res.data.action === "followed"
                            ? [...followers, user._id]
                            : followers.filter(id => id !== user._id),
                    };
                })
            );
        } catch (err) {
            console.error(err);
        }
    };

    const [appUsers, setAppUsers] = useState([]);
    const [errors, setError] = useState(null);

    const SearchUsers = async (name) => {
        if (!name.trim()) {
            setAppUsers([]);
            setError(null);
            return;
        }

        try {
            const res = await API.get(`/api/users/search?name=${name}`);

            if (res.data.success) {
                setAppUsers(res.data.searchUser);
                setError(null);
            } else {
                setAppUsers([]);
                setError(res.data.message);
            }
        } catch {
            setAppUsers([]);
            setError("Error while searching users");
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
            } catch (error) {
                return { ok: false, message: error.response?.data?.message }
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
                FollowUnFollowUsers,
                appUsers,
                errors, SearchUsers
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
