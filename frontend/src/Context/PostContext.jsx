import { createContext, useState, useContext, useCallback,useEffect } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import { useGlobal } from './GlobalContext';
const PostContext = createContext();
export const PostProvider = ({ children }) => {

    const { user } = useGlobal();
    const [loading, setLoading] = useState(false);
    const [deletingId, setDeletingId] = useState(null);
    const [posts, setPosts] = useState([]);


    //Fetch user posts ok!
    const fetchPosts = useCallback(async () => {

        try {
            setLoading(true);
            const res = await axios.get('http://localhost:5000/api/user/post/getposts');
            if (res.data.success) {
                setPosts(res.data.posts);
                //localStorage.setItem('posts', JSON.stringify(res.data.posts))
            }

        }
        catch (error) {
            console.error(error);
            toast.error("Failed to load posts");
        }
        finally {
            setLoading(false);
        }

    }, [])

    useEffect(() => {
        fetchPosts();
    }, [fetchPosts]);

    // Create a new Post ok!
    const createPost = async (file, title, caption) => {

        if (!user?._id || !file) {
            toast.error("Missing User Data");
            return;
        }

        //try {

        const formData = new FormData();
        formData.append("image", file);
        formData.append("title", title);
        formData.append("caption", caption);
        formData.append("userId", user._id);

        const createPromise = axios.post("http://localhost:5000/api/user/post/addpost",
            formData,
        );

        toast.promise(createPromise, {
            loading: 'Adding Post',
            success: 'Post is Live!',
            error: 'Failed to Add Post!'
        })

        try {
            const res = await createPromise;
            if (res.data?.success) {
                setPosts(prev => [res.data.post, ...prev]);
                localStorage.setItem('posts', JSON.stringify([res.data.post, ...posts]));

            }
            return res.data;
        }
        catch (error) {
            console.log(error.response?.data || error.message);

        }
    } 


    //Delete Post OK!
    const deletePost = async (postId) => {

        if (!postId) {
            return;
        }
        setDeletingId(postId);

        const deletePromise = axios.delete(`http://localhost:5000/api/user/post/${postId}`, {
            data: { userId: user._id }
        })

        await toast.promise(deletePromise, {
            loading: 'Deleting Post',
            success: 'Post Deleted',
            error: 'Failed to Delete Post!'
        })
        try {
            await deletePromise;
            setPosts((prev) => prev.filter((p) => p._id !== postId));
        } catch (error) {
            console.log(error.response?.data || error.message)
        }
        finally {
            setDeletingId(null);
        }
        //await axios.delete(`http://localhost:5000/api/user/post/${postId}`, { data: {userId:user._id}})

    }

    return (
        <PostContext.Provider value={{ posts, createPost, fetchPosts, deletePost,loading,deletingId }}>
            {children}
        </PostContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePosts = () => useContext(PostContext);
