import { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useGlobal } from './GlobalContext';
const PostContext = createContext();

export const PostProvider = ({ children }) => {


    // eslint-disable-next-line no-unused-vars
    const [loading, setLoading] = useState(false);
    //console.log("loading:",posts,loading)

    const { user } = useGlobal();

    //const [posts, setPosts] = useState([])
    const [posts, setPosts] = useState(() => {
        const saved = localStorage.getItem("posts");
        return saved ? JSON.parse(saved) : [];
    });

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const res = await axios.get('http://localhost:5000/api/user/post/getposts');
            if (res.data.success) {
                setPosts(res.data.posts);
                localStorage.setItem('posts', JSON.stringify(res.data.posts))
            }

        }
        catch (error) {
            console.log("error:", error)
        }
        finally {
            setLoading(false);
        }

    }
    useEffect(() => {
        fetchPosts();
    }, [])



    // Create a new Post
    const createPost = async (file, title, caption, userId) => {

        try {

            const formData = new FormData();
            formData.append("image", file);
            formData.append("title", title);
            formData.append("caption", caption);
            formData.append("userId", userId);

            const res = await axios.post("http://localhost:5000/api/user/post/addpost",
                formData,
                {
                    headers:
                    {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            if (res.data.success) {

                const newPost = res.data.post;

                setPosts(prev => {
                    const updated = [newPost, ...prev];
                    localStorage.setItem("posts", JSON.stringify(updated));
                    return updated;
                });
            }

            return res.data;

        } catch (err) {
            return {
                success: false,
                message: err.response?.data?.message || "Network error"
            };
        }

    };

    //Delete Post
    const deletePost = async (postId) => {

        await axios.delete(`http://localhost:5000/api/user/post/${postId}`, { data: {userId:user._id}})

        setPosts(prev => prev.filter(p => p._id !== postId));
    }

    return (
        <PostContext.Provider value={{ posts, createPost, fetchPosts, deletePost }}>
            {children}
        </PostContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePosts = () => useContext(PostContext);
