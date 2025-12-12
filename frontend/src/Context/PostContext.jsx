import { createContext, useState, useContext } from "react";
import axios from "axios";

const PostContext = createContext();

export const PostProvider = ({ children }) => {

    const [posts, setPosts] = useState(() => {
        const saved = localStorage.getItem("posts");
        return saved ? JSON.parse(saved) : [];
    });

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

    return (
        <PostContext.Provider value={{ posts, createPost }}>
            {children}
        </PostContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePosts = () => useContext(PostContext);
