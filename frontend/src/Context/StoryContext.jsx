import { createContext, useContext } from "react";
import axios from "axios";
import { useGlobal } from "./GlobalContext";
const StoryContext = createContext();

export const StoryProvider = ({ children }) => {

    const { user } = useGlobal();

    const uploadStory = async (file) => {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("userId", user._id);

        const res = await axios.post(
            "http://localhost:5000/api/user/story/uploadstory",
            formData,
            { headers: { "Content-Type": "multipart/form-data" } }
        );

        return res.data;
    };

    const viewStory = async (userId) => {
        try {
            const res = await axios.get(
                `http://localhost:5000/api/user/story/view/${userId}`
            );
            return res.data;
        } catch (error) {
            console.log('Error found', error.response?.data || error.message);
            return { success: false };
        }
    };

    return (
        <StoryContext.Provider value={{ uploadStory, viewStory, }}>
            {children}
        </StoryContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStory = () => useContext(StoryContext);
