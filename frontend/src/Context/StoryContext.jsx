import { createContext, useContext, useState, useCallback } from "react";
import axios from "axios";
import { useGlobal } from "./GlobalContext";
const StoryContext = createContext();
import toast from 'react-hot-toast';

export const StoryProvider = ({ children }) => {

    const { user } = useGlobal();
    const [stories, setStories] = useState([]);
    const [loadingStories, setLoadingStories] = useState(false);
    const [deletingId, setDeletingId] = useState(null);


    const uploadStory = async (file) => {

        //if (!user?._id) return;
        if (!user?._id||!file) {
            toast.error("Eiter you not loggin or select wrong file!");
            return;
        }
       
        const formData = new FormData();
        formData.append("image", file);
        formData.append("userId", user._id);

        const uploadPromise = axios.post("http://localhost:5000/api/user/story/uploadstory",
            formData,
            //{ headers: { "Content-Type": "multipart/form-data" } }
        )
        toast.promise(uploadPromise, {
            loading: "Uploading...",
            success: "Story is Live!",
            error: "Failed to Upload",
        })
        const res = await uploadPromise;
        if (res.data?.success) {
            setStories((prev)=>[res.data.story,...prev])
        }

        return res.data;
    };

    const viewStory = useCallback(async (userId) => {
        if (!userId) return;
        try {
            setLoadingStories(true);

            const res = await axios.get(
                `http://localhost:5000/api/user/story/view/${userId}`
            );

            if (res.data?.success) {
                setStories(res.data.story);
            }

            return res.data;

        } catch (error) {
            console.log(error.response?.data || error.message, 'Error found');
            //return { success: false };
        } finally {
            setLoadingStories(false);
        }
    },[]);

    const deleteStory = async (storyId) => {

        if (!storyId || !user?._id) {
            return;
        }
        setDeletingId(storyId);

        const deletePromise = axios.delete(`http://localhost:5000/api/user/story/${storyId}`, {
            data: { userId: user._id }
        })
        toast.promise(deletePromise, {
            loading: "Story Deleting...",
            success: "Story Deleted.",
            error:"Failed to Delete Story!"
        })
        try {
            await deletePromise;
            setStories((prev) => prev.filter((s) => s._id !== storyId))
        }
        catch (error) {
            console.log(error.response?.data || error.message)
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <StoryContext.Provider value={{ uploadStory, viewStory, deleteStory, stories, loadingStories,deletingId }}>
            {children}
        </StoryContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStory = () => useContext(StoryContext);
